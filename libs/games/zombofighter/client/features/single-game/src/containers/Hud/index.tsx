import { FC } from 'react'

import {
    useActionButton,
    useHeader,
    useRounds,
    useBodyPartsCheckbox,
    useDefend,
    useAttack,
    useDamages,
    useRoundGreeting,
    useQuitPopup
} from '../../hooks/Hud'
import {
    ActionButton,
    Header,
    Rounds,
    BodyPartsCheckbox,
    Defend,
    Attack,
    Damages,
    RoundGreeting,
    QuitPopup
} from '../../ui/Hud'

export const HudContainer: FC = () => {
    const actionButton = useActionButton()
    const header = useHeader()
    const rounds = useRounds()
    const bodyPartsCheckbox = useBodyPartsCheckbox()
    const defend = useDefend()
    const attack = useAttack()
    const damages = useDamages()
    const roundGreeting = useRoundGreeting()
    const quitPopup = useQuitPopup()

    return (
        <>
            <ActionButton
                isVisible={actionButton.isVisible}
                isDisabled={actionButton.isDisabled}
                text={actionButton.text}
                onClick={actionButton.handleClick}
            />

            <Header
                isVisible={header.isVisible}
                isCanQuit={header.isCanQuit}
                player={header.player}
                opponent={header.opponent}
                onQuitClick={header.handleQuitClick}
            />

            <Rounds
                isVisible={rounds.isVisible}
                isWatchBlinking={rounds.isWatchBlinking}
                isWatchExpired={rounds.isWatchExpired}
                time={rounds.time}
                current={rounds.current}
                count={rounds.count}
            />

            <BodyPartsCheckbox
                isVisible={bodyPartsCheckbox.isVisible}
                maxCount={bodyPartsCheckbox.maxCount}
                selectedCount={bodyPartsCheckbox.selectedCount}
            />

            <Defend
                isVisible={defend.isVisible}
                isIconVisible={defend.isIconVisible}
                selectedParts={defend.selectedParts}
                defendedParts={defend.defendedParts}
                damagedParts={defend.damagedParts}
                disabledParts={defend.disabledParts}
                darkedParts={defend.darkedParts}
                onBodyPartClick={defend.handleBodyPartClick}
            />

            <Attack
                isVisible={attack.isVisible}
                isIconVisible={attack.isIconVisible}
                selectedParts={attack.selectedParts}
                defendedParts={attack.defendedParts}
                damagedParts={attack.damagedParts}
                disabledParts={attack.disabledParts}
                darkedParts={attack.darkedParts}
                onBodyPartClick={attack.handleBodyPartClick}
            />

            <Damages
                isVisible={damages.isVisible}
                values={damages.values}
            />

            <RoundGreeting
                isVisible={roundGreeting.isVisible}
                text={roundGreeting.text}
            />

            <QuitPopup
                isVisible={quitPopup.isVisible}
                onConfirmClick={quitPopup.handleConfirmClick}
                onCancelClick={quitPopup.handleCancelClick}
            />
        </>
    )
}
