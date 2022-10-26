extern crate near_sdk;

use std::collections::{HashMap};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, Promise, Balance, AccountId, BorshStorageKey, json_types::U128, ONE_NEAR};
use near_sdk::collections::{LookupMap, LookupSet};
use near_sdk::serde::Serialize;

#[derive(BorshSerialize, BorshStorageKey)]
enum StorageKey {
    Players,
    Games,
    Referees,
}

const GAME_FEES: Balance = ONE_NEAR / 10;


#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Statement {
    owner: AccountId,
    winner: Option<AccountId>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct PlayerStatistic {
    pub wins: u32,
    pub losses: u32,
    pub draws: u32,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Player {
    pub id: AccountId,
    pub statistic: PlayerStatistic,
    pub deposit: Balance,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Game {
    pub id: String,
    pub players: HashMap<AccountId, Player>,
    pub statements: HashMap<AccountId, Statement>,
    pub is_finished: bool,
    pub created_at: u64,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ZomboFighter {
    pub players: LookupMap<AccountId, Player>,
    pub games: LookupMap<String, Game>,
    pub referees: LookupSet<AccountId>,
}

impl Default for ZomboFighter {
    fn default() -> Self {
        Self {
            players: LookupMap::new(StorageKey::Players),
            games: LookupMap::new(StorageKey::Games),
            referees: LookupSet::new(StorageKey::Referees),
        }
    }
}

#[near_bindgen]
impl ZomboFighter {
    #[payable]
    pub fn deposit(&mut self) {
        let account_id = env::predecessor_account_id();
        let deposit = env::attached_deposit();

        let mut player = self.players.get(&account_id).expect("Player not found");

        player.deposit += deposit;

        self.players.insert(&account_id, &player);
    }

    pub fn get_player(&self, id: AccountId) -> Player {
        self.players.get(&id).expect("Player not found")
    }

    pub fn start_game(&mut self, player1: AccountId, player2: AccountId, id: String) -> String {
        assert!(self.referees.contains(&env::predecessor_account_id()), "Only referees can start games");

        let mut players = HashMap::new();
        let player1 = self.players.get(&player1).expect("Player not found");
        let player2 = self.players.get(&player2).expect("Player not found");

        assert!(player1.deposit >= GAME_FEES, "Player1 deposit is not enough");
        assert!(player2.deposit >= GAME_FEES, "Player1 deposit is not enough");

        players.insert(player1.id.clone(), player1);
        players.insert(player2.id.clone(), player2);

        let game = Game {
            id,
            players,
            is_finished: false,
            statements: HashMap::new(),
            created_at: env::block_timestamp(),
        };
        self.games.insert(&game.id, &game);

        game.id
    }

    pub fn register(&mut self) {
        let id = env::predecessor_account_id();

        assert!(self.players.get(&id).is_none(), "Player already registered");

        let player = Player {
            id: id.clone(),
            statistic: PlayerStatistic {
                wins: 0,
                losses: 0,
                draws: 0,
            },
            deposit: 0,
        };

        self.players.insert(&id, &player);
    }

    pub fn withdrawal(&mut self, amount: U128) {
        let player_id = env::predecessor_account_id();
        let mut player: Player = self.players.get(&player_id).expect("Player not found");

        assert!(player.deposit >= amount.0, "Not enough deposit");

        player.deposit -= amount.0;
        self.players.insert(&player_id, &player);
        Promise::new(env::predecessor_account_id()).transfer(amount.0);
    }

    pub fn get_game(&self, id: String) -> Game {
        self.games.get(&id).expect("Game not found")
    }

    pub fn accept_result(&mut self, game_id: String, player_id: AccountId, winner: Option<AccountId>) {
        if player_id.clone() != env::predecessor_account_id() {
            assert!(self.referees.contains(&env::predecessor_account_id()), "Only referees can accept the result");
        }

        let mut game = self.games.get(&game_id).expect("Game not found");
        assert_eq!(game.is_finished, false, "Game already finished");
        assert!(game.statements.get(&player_id).is_none(), "Player already accepted the result");

        let statement = Statement {
            owner: player_id.clone(),
            winner,
        };

        game.statements.insert(player_id, statement);


        let mut statements: Vec<Statement> = Vec::new();

        for statement in game.statements.values() {
            statements.push(Statement {
                owner: statement.owner.clone(),
                winner: statement.winner.clone(),
            });
        }

        self.games.insert(&game_id, &game);

        if game.statements.len() >= 2 && ZomboFighter::is_consistent_statements(&statements) {
            self.finish_game(&game_id);
        }
    }


    fn finish_game(&mut self, game_id: &String) {
        let mut game = self.games.get(&game_id).expect("Game not found");
        let is_draw = ZomboFighter::is_draw(&game.statements);

        if is_draw {
            for player in game.players.values() {
                let mut player = self.players.get(&player.id).expect("Player not found");
                player.statistic.draws += 1;
                self.players.insert(&player.id, &player);
            }
        } else {
            let winner = self.get_winner(game_id).expect("Winner not found");
            let winner_player = game.players.get_mut(&winner).expect("Player not found");

            winner_player.statistic.wins += 1;
            winner_player.deposit += GAME_FEES * 8 / 10;

            self.players.insert(&winner_player.id, &winner_player);

            for player in game.players.values() {
                if player.id != winner {
                    let mut player = self.players.get(&player.id).expect("Player not found");
                    player.statistic.losses += 1;
                    player.deposit -= GAME_FEES;

                    self.players.insert(&player.id, &player);
                }
            }
        }

        game.is_finished = true;

        self.games.insert(&game_id, &game);
    }

    fn get_winner(&mut self, game_id: &String) -> Option<AccountId> {
        let mut winner: HashMap<AccountId, u8> = HashMap::new();
        let game = self.games.get(&game_id).expect("Game not found");

        for (_, statement) in game.statements {
            if statement.winner.is_some() {
                match [&statement.winner] {
                    [Some(winner_id)] => {
                        winner.insert(winner_id.clone(), winner.get(winner_id).unwrap_or(&0) + 1);
                    }
                    _ => {}
                }
            }
        }

        for (player, approves) in winner {
            if approves >= 2 {
                return Some(player);
            }
        }

        return None;
    }

    fn is_consistent_statements(statements: &Vec<Statement>) -> bool {
        let mut is_consistent = true;
        let mut equal_statements = 0;

        for (i, statement) in statements.iter().enumerate() {
            for (j, statement2) in statements.iter().enumerate() {
                if i == j {
                    continue;
                }

                match [&statement.winner, &statement2.winner] {
                    [Some(winner), Some(winner2)] => {
                        if winner.as_str() == winner2.as_str() {
                            equal_statements += 1;
                        }
                    }
                    [None, None] => {
                        equal_statements += 1;
                    }
                    _ => {}
                }
            }
        }

        if equal_statements < 2 {
            is_consistent = false;
        }

        is_consistent
    }

    fn is_draw(statements: &HashMap<AccountId, Statement>) -> bool {
        for (_, statement) in statements {
            if statement.winner.is_some() {
                return false;
            }
        }

        return true;
    }


    #[private]
    pub fn add_referee(&mut self, id: AccountId) {
        self.referees.insert(&id);
    }

    #[private]
    pub fn remove_referee(&mut self, id: AccountId) {
        self.referees.remove(&id);
    }
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{testing_env, VMContext};


    fn get_context(predecessor_account_id: AccountId) -> VMContext {
        let mut builder = VMContextBuilder::new();

        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id)
            .attached_deposit(1_000_000_000_000_000_000_000_000)
            .build()
    }

    #[test]
    fn register() {
        let context = get_context(accounts(1));
        testing_env!(context);
        let mut contract = ZomboFighter::default();
        contract.register();
        let player = contract.get_player(accounts(1));
        assert_eq!(player.id, accounts(1));
    }

    #[test]
    fn get_player() {
        let context = get_context(accounts(1));
        testing_env!(context);
        let mut contract = ZomboFighter::default();
        contract.register();
        let player = contract.get_player(accounts(1));
        assert_eq!(player.id, accounts(1));
    }

    #[test]
    fn deposit() {
        let context = get_context(accounts(1));
        testing_env!(context);
        let mut contract = ZomboFighter::default();
        contract.register();
        contract.deposit();
        let player = contract.get_player(accounts(1));
        assert_eq!(player.deposit, 1000000000000000000000000);
    }

    #[test]
    fn withdrawal() {
        let context = get_context(accounts(1));
        testing_env!(context);
        let mut contract = ZomboFighter::default();
        contract.register();
        contract.deposit();
        contract.withdrawal(U128::from(1000000000000000000000000));
        let player = contract.get_player(accounts(1));
        assert_eq!(player.deposit, 0);
    }

    #[test]
    fn start_game() {
        let mut contract = ZomboFighter::default();

        let player_1_context = get_context(accounts(1));
        let player_2_context = get_context(accounts(2));
        let referee_context = get_context(accounts(3));
        contract.add_referee(accounts(3));

        testing_env!(player_1_context);

        contract.register();
        contract.deposit();


        testing_env!(player_2_context);

        contract.register();
        contract.deposit();

        testing_env!(referee_context);

        contract.start_game(accounts(1), accounts(2), "game-1".to_string());
        let game = contract.get_game("game-1".to_string());
        assert_eq!(game.players.len(), 2);
    }

    #[test]
    fn accept_result() {
        let mut contract = ZomboFighter::default();

        let player_1_context = get_context(accounts(1));
        let player_2_context = get_context(accounts(2));
        let referee_context = get_context(accounts(3));
        contract.add_referee(accounts(3));

        testing_env!(player_1_context);

        contract.register();
        contract.deposit();

        testing_env!(player_2_context);

        contract.register();
        contract.deposit();

        testing_env!(referee_context);

        contract.start_game(accounts(1), accounts(2), "game-1".to_string());


        contract.accept_result("game-1".to_string(), accounts(1), Some(accounts(1)));
        contract.accept_result("game-1".to_string(), accounts(2),  Some(accounts(2)));
        contract.accept_result("game-1".to_string(), accounts(3),  Some(accounts(2)));

        assert!(contract.get_game("game-1".to_string()).is_finished);
        assert_eq!(contract.get_player(accounts(1)).statistic.losses, 1);
        assert_eq!(contract.get_player(accounts(2)).statistic.wins, 1);
        assert_eq!(contract.get_player(accounts(2)).deposit, ONE_NEAR + GAME_FEES * 8 / 10);
        assert_eq!(contract.get_player(accounts(1)).deposit, ONE_NEAR - GAME_FEES);
    }

    #[test]
    fn is_consistent_statements() {
        let mut un_consistent_statements: Vec<Statement> = Vec::new();

        un_consistent_statements.push(Statement {
            winner: Some(accounts(1)),
            owner: accounts(1),
        });
        un_consistent_statements.push(Statement {
            winner: Some(accounts(2)),
            owner: accounts(2),
        });

        assert_eq!(ZomboFighter::is_consistent_statements(&un_consistent_statements), false);


        let mut consistent_statements = Vec::new();
        consistent_statements.push(Statement {
            owner: accounts(1),
            winner: Some(accounts(1)),
        });
        consistent_statements.push(Statement {
            owner: accounts(2),
            winner: Some(accounts(2)),
        });
        consistent_statements.push(Statement {
            owner: accounts(3),
            winner: Some(accounts(2)),
        });

        assert!(ZomboFighter::is_consistent_statements(&consistent_statements));
    }
}
