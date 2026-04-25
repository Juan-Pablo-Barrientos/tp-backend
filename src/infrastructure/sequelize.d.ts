declare module 'sequelize' {
    export { Sequelize, cast, literal, where } from '../../node_modules/sequelize/types/sequelize';
    export { DataTypes, Op, QueryTypes, TableHints, IndexHints, Deferrable, Utils } from '../../node_modules/sequelize/types/index';
    export { INTEGER } from '../../node_modules/sequelize/types/data-types';
}