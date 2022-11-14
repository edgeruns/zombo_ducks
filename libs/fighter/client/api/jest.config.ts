/* eslint-disable */
export default {
    displayName: 'fighter-client-api',
    preset: '../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../coverage/libs/fighter/client/api',
}
