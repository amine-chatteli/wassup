import { createSelector } from 'reselect';

const selectUsers = state => state.users;

export const selectTheUser =username=> createSelector(
    [selectUsers],
    users=>users.find(user=>user.username===username)
);

export const selectUserToCheckProfile=state=>state.users.user
export const selectFetching=state=>state.users.fetching


export const selectCurrentUser=state=>state.currentUser

export const selectErrors=state=>state.errors

export const selectMessages = state => state.messages;


