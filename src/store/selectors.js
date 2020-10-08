import { createSelector } from 'reselect';

const selectUsers = state => state.users;

export const selectTheUser =username=> createSelector(
    [selectUsers],
    users=>users.find(user=>user.username===username)
);
