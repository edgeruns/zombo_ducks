/* eslint-disable */
export default {
    displayName: 'games-zombofighter-api-config',
    preset: '../../../../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
        },
    },
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory:
        '../../../../../coverage/libs/games/zombofighter/api/config',
}
