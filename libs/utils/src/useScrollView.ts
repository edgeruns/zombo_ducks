import { RefObject, useState, useEffect } from 'react'

export function useScrollView(
    containerRef: RefObject<HTMLElement>,
    stop: boolean = false
) {
    const [proportion, setProportion] = useState(-1);

    // eslint-disable-next-line consistent-return
    // @ts-ignore
    useEffect(() => {
        const container = containerRef.current;

        if (container && !stop) {
            const getProportion = () => {
                const containerRect = container.getBoundingClientRect()
                const containerTop = containerRect.y
                const containerHeight = containerRect.height

                const viewHeight = window.innerHeight
                const offsetTop =
                  containerTop > 0 ? -containerTop : Math.abs(containerTop)

                let newProportion = 0

                newProportion = ((offsetTop + viewHeight) / containerHeight) * 100

                return newProportion
            }

            const onScroll = () => {
                requestAnimationFrame(() => {
                    setProportion(getProportion())
                })
            }

            window.addEventListener('scroll', onScroll, false);

            onScroll()

            return () => {
                window.removeEventListener('scroll', onScroll, false);
            }
        }
    }, [containerRef, stop])

    return proportion
}
