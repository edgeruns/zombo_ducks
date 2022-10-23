use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, Promise, Balance, AccountId, DateTime};

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

pub struct Game {
    pub players: Vec<Player>,
    pub created_at: DateTime<Utc>,
}

#[near_bindgen]
impl ZomboFighter {

    pub fn get_player(&self, id: AccountId) -> Player {
        self.players.get(&id).expect("Player not found")
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

    pub fn deposit(&mut self) {
        let deposit = env::attached_deposit();
        let player_id = env::predecessor_account_id();
        let mut player = self.players.get(&player_id).expect("Player not found");
        player.deposit += deposit;
        self.players.insert(&player_id, &player);
    }

    pub fn withdrawal(&mut self, amount: Balance) {
        let player_id = env::predecessor_account_id();
        let mut player: Player = self.players.get(&player_id).expect("Player not found");

        assert!(player.deposit >= amount, "Not enough deposit");

        player.deposit -= amount;
        self.players.insert(&player_id, &player);
        Promise::new(player_id).transfer(amount);
    }
}

#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;
    use near_sdk::test_utils::VMContextBuilder;
    use near_sdk::{testing_env, VMContext};


    fn get_context(predecessor_account_id: AccountId) -> VMContext {
        VMContextBuilder::new()
            .predecessor_account_id(predecessor_account_id)
            .build()
    }


}
