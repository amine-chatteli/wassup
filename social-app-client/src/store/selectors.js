import { createSelector } from 'reselect';

const selectUsers = state => state.users;

export const selectTheUser =username=> createSelector(
    [selectUsers],
    users=>users.find(user=>user.username===username)
);

export const selectCurrentUser=state=>state.currentUser

export const selectErrors=state=>state.errors

export const selectMessages = state => state.messages;


export const selectUserToCheckProfile=state=>state.user?state.user:null