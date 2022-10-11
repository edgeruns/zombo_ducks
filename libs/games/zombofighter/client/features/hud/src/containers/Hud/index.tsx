import React, { FC } from 'react'

import {
    useMenu,
    useStartButton,
    useActionButton,
    useSearching,
    useHeader,
    useRounds,
    useBodyPartsCheckbox,
    useDefend,
    useAttack,
    useDamages,
    useRoundGreeting,
    useQuitPopup
} from '../../hooks'
import {
    Menu,
    StartButton,
    ActionButton,
    Searching,
    Header,
    Rounds,
    BodyPartsCheckbox,
    Defend,
    Attack,
    Damages,
    RoundGreeting,
    QuitPopup
} from '../../ui'

export const HudContainer: FC = () => {
    const menu = useMenu()
    const startButton = useStartButton()
    const actionButton = useActionButton()
    const searching = useSearching()
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
            <Menu
                isVisible={menu.isVisible}
                isSoundsDisabled={menu.isSoundsDisabled}
                onSoundClick={menu.handleSoundClick}
                onTutorialClick={menu.handleTutorialClick}
            />

            <StartButton
                isVisible={startButton.isVisible}
                text={startButton.text}
                onClick={startButton.handleClick}
            />

            <ActionButton
                isVisible={actionButton.isVisible}
                isDisabled={actionButton.isDisabled}
                text={actionButton.text}
                onClick={actionButton.handleClick}
            />

            <Searching
                isVisible={searching.isVisible}
                text={searching.text}
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
