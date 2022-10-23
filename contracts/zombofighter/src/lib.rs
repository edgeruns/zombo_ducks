extern crate near_sdk;

use std::collections::HashMap;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, Promise, Balance, AccountId};
use near_sdk::collections::UnorderedMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct PlayerStatistic {
    pub wins: u32,
    pub losses: u32,
    pub draws: u32,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Player {
    pub id: AccountId,
    pub statistic: PlayerStatistic,
    pub deposit: Balance,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Game {
    pub id: u32,
    pub players: Vec<Player>,
    pub created_at: u64,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct ZomboFighter {
    pub players: UnorderedMap<AccountId, Player>,
    pub games: HashMap<u32, Game>,
    pub referee: AccountId,
}

#[near_bindgen]
impl ZomboFighter {
    #[init]
    pub fn new(referee: AccountId) -> Self {
        assert!(!env::state_exists(), "Already initialized");
        Self {
            players: UnorderedMap::new(b"p".to_vec()),
            games: HashMap::new(),
            referee,
        }
    }

    #[payable]
    pub fn deposit(&mut self) {
        let deposit = env::attached_deposit();
        let player_id = env::predecessor_account_id();
        let mut player = self.players.get(&player_id).expect("Player not found");
        player.deposit += deposit;
        self.players.insert(&player_id, &player);
    }

    pub fn get_player(&self, id: AccountId) -> Player {
        self.players.get(&id).expect("Player not found")
    }

    pub fn start_game(&mut self, player1_id: AccountId, player2_id: AccountId) -> u32 {
        assert_eq!(env::predecessor_account_id(), self.referee, "Only referee can start a game");

        let game_id = self.games.len() as u32;
        let player1 = self.players.get(&player1_id).expect("Player not found");
        let player2 = self.players.get(&player2_id).expect("Player not found");

        let game = Game {
            id: game_id,
            players: vec![
                player1,
                player2
            ],
            created_at: env::block_timestamp(),
        };
        self.games.insert(game_id, game);
        game_id
    }

    pub fn register(&mut self) {
        let id = env::predecessor_account_id();
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

    pub fn withdrawal(&mut self, amount: Balance) {
        let player_id = env::predecessor_account_id();
        let mut player: Player = self.players.get(&player_id).expect("Player not found");

        assert!(player.deposit >= amount, "Not enough deposit");

        player.deposit -= amount;
        self.players.insert(&player_id, &player);
        Promise::new(player_id).transfer(amount);
    }

    pub fn get_game(&self, id: u32) -> &Game {
        self.games.get(&id).expect("Game not found")
    }

    #[private]
    pub fn set_referee(&mut self, referee: AccountId) {
        self.referee = referee;
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
        let mut contract = ZomboFighter::new(accounts(0));
        contract.register();
        let player = contract.get_player(accounts(1));
        assert_eq!(player.id, accounts(1));
    }

    #[test]
    fn get_player() {
        let context = get_context(accounts(1));
        testing_env!(context);
        let mut contract = ZomboFighter::new(accounts(3));
        contract.register();
        let player = contract.get_player(accounts(1));
        assert_eq!(player.id, accounts(1));
    }

    #[test]
    fn deposit() {
        let context = get_context(accounts(1));
        testing_env!(context);
        let mut contract = ZomboFighter::new(accounts(3));
        contract.register();
        contract.deposit();
        let player = contract.get_player(accounts(1));
        assert_eq!(player.deposit, 1000000000000000000000000);
    }

    #[test]
    fn withdrawal() {
        let context = get_context(accounts(1));
        testing_env!(context);
        let mut contract = ZomboFighter::new(accounts(3));
        contract.register();
        contract.deposit();
        contract.withdrawal(1000000000000000000000000);
        let player = contract.get_player(accounts(1));
        assert_eq!(player.deposit, 0);
    }

    #[test]
    fn start_game() {
        let player_1_context = get_context(accounts(1));
        let player_2_context = get_context(accounts(2));
        let referee_context = get_context(accounts(3));
        testing_env!(player_1_context);

        let mut contract = ZomboFighter::new(accounts(3));

        contract.register();
        contract.deposit();

        testing_env!(player_2_context);

        contract.register();
        contract.deposit();

        testing_env!(referee_context);

        contract.start_game(accounts(1), accounts(2));
        let game = contract.get_game(0);
        assert_eq!(game.players.len(), 2);
    }
}
