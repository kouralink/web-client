# Project Todo List

## what i can do:

- create account
- update account info
- create team
- change account type
- open profile page
- open team page
- authentication
- search on users
- search on teams 
- update team info
- style profile page
- create team error handling
- kick player
- ban player


## what i need to add;

- Notifications redux actions
    - [x] request to join team
    - [x] invite to team
    - [x] info notifiaction
    - [ ] Change coach to members
    - [ ] match Challenge
    - [ ] request to join tournament
    - [ ] invite to tournament
    
- [x] Create Notifiaction UI
- [x] Add Notifications to notification aside
- [x] shout some default users and teams in search page.
- [x] hidde create Team btn when the user is not a coach
- [x] leave team for Members
- [x] add Alert confirmation for the actions  ban , leave, kick, change coach
- [x] create Notificaiton Accept and View and Decline actions
- [x] invite to team notification (give caoch possible to invite someone)
- [x] action type decline should be update in invite to team notification (redux notificatio state)
- [x] Notification Triggers (request to join team , invite to team)
- [x] team details => show hidden team info 
- [x] member details => show hidden member info
- [x] navbar active link
- [x] Members Join & Leave Triggers
- [x] change coach (set Coach one of the members)
- [x] create cloud function for change coach
- [x] add Ban List to team page for make possible to remove someone from black list 
- [x] update team state after every change
    - [x] ban:update members
    - [x] kick:update memebrs
    - [x] leave:update members
    - [x] change coach update team 
- [ ] Member can't join team if was in blacklist
    - [ ] update could functions trigger
    - [ ] update redux actions check (
        [ ] invite to team check / 
        [ ] request accept check / 
        [ ] send request to join team check)

- [ ] create new match form
- [ ] new match redux state and thunks (require match challenge notification)
- [ ] match triggers (update on notification update trigger to include match_chalenege notificaiton type)
- [ ] create zod form validation for register and login
- [ ] check username is unique in the lower case state
- [ ] team not really deleted is just gived another field called deleted
- 

## triggers
- [ ] Notification accepted
    - [x] Request to join team
    - [x] Invite to team
    - [ ] match challenge
- [x] on Member joined or leaved a team
- [x] on role if member change to coach update the user account type to coach too
- [x] on role if coach change to member update the user account type to member too
- [ ] Notification Triggers (match challenge)
- [ ] change account type when  change coach for new coach and the old one
- [ ] is not possible to ajout or leave team for coach it's need to change coach first and set one of members or delete team
- [ ] if coach left the team (some how) the oldest member will be the coach if no members found the team will be deleted
- [ ] notification of coach change should be sent to all members
 [ ] 


## firebase rules should add:
- teams:
    - for edit/invite/acceptRequests on team the uid of editor should be the coach
    - team name should be unique (upper lower case)
- notifications:
    - check if the sender is right one (for example the coach of team is only one who can send request to join team)
    - only the to_id can change the action of notification
- users:
    - check if uid === uid of user that want to edit his data
    - username should be unique chack(lower upper case)


    
## Fast & Flexibility
- [ ] update isAlreadyInTeam function in authSlice to use __name__ way like in teamSlice

## After done with projet
- [ ] add favorite to teams and users
- [ ] fix ui
- [ ] link Home page section with real content
- [ ] add posts page

## was working on:

@@ilorez => Notification start from zero in aside when the user open the notification sheet
@@Abdo-Nsila => tournament optimize brackets component
@@Wahmane-Hamza => team search  page
@@Merieme => Rapport (3 Chapitres)

## @@Wahmane-Hamza tasks:
- [x] Intro
- [ ] create project text for video
- [ ] create project video

## @@Merieme tasks:
- [x] Raport 50%
- [ ] Raport 100%


## match tasks and rules and triggers

- [ ] trriger notification on invite refree to match can be aceepted if the refree have a match in same time


