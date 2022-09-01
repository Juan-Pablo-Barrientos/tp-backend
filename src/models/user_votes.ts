import sequelizeORM from '../database/connection';
import User from './user';
import Polls from './polls';
import PollValues from './poll_values';

const UserVotes = sequelizeORM.define('user_votes', {});
UserVotes.removeAttribute('id');

Polls.hasMany(UserVotes);
PollValues.hasMany(UserVotes);
User.hasMany(UserVotes);
UserVotes.belongsTo(User);
UserVotes.belongsTo(Polls);
UserVotes.belongsTo(PollValues);
export default UserVotes;