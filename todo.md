# Project Todo List

## what i can do:

- [x] create account
- [x] update account info
- [x] create team
- [x] change account type
- [x] open profile page
- [x] open team page
- [x] authentication
- [x] search on users
- [x] search on teams 
- [x] update team info
- [x] style profile page
- [x] create team error handling
- [x] kick player
- [x] ban player


## what i need to add;

- Notifications redux actions
    - [x] request to join team
    - [x] invite to team
    - [x] info notifiaction
    - [x] Change coach to member
    - [x] match Challenge
    - [ ] invite refree to match
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
- [x] Member can't join team if was in blacklist
    - [x] update could functions trigger
    - [x] update redux actions check 
        [x] invite to team check 
        [x] request accept check  
        [x] send request to join team check
- [x] match challenge Request notification
- [x] match triggers (update on notification update trigger to include match_chalenege notificaiton type)
- [x] create new match form
- [x] create async thun for getting team matchs history
- [x] show much history in team page
- [x] create match routes
- [x] understand the ui logic of edits is match
- [x] create match page for not coachs
- [x] create match page for coachs
- [x] new match redux state and thunks
- [x] Redux for match:
    - [x] get match info
    - [x] get match team1 info
    - [x] get match team2 info
    - [x] get match team1 members info
    - [x] get match team2 members info
    - [x] get match refree info
    - [x] link match slice with redux store
- [x] create validation data for match details edits
- [ ] create refree search 
    - [ ] redux (search refree) & invite refree action
    - [x] create search ui
    - [ ] create trigger for refree accept / decline match challenge (on Decline set isAgreed to false)
    - [x] add field is refree accept request to match
    - [x] update match type
- [x] match status type "not started" "in progress" "cancelled" "ended" "pending"
- [x] update status check in created components
- [ ] match setup before start
- [x] Match Deatils Component
- [x] Match Details From Componenet
- [ ] Match Header Component
    - [x] UI
    - [ ] action ui
    - [ ] action redux
    - [ ] possible edit (score) and action End match for refree


- [ ] Show pending matchs in profile of refree
- [ ] show team page card in members and coach profile

- [ ] create zod form validation for register and login
- [ ] check username is unique in the lower case state
- [ ] if not members in team coach can delete the team but:
    - [ ] team not really deleted is just called that because the team will be have no coach and team name will change to del
- [ ] check if there any null notification of type match challenge or request to join team or invite to team that already sended in last 24h
- [ ] bag notification is not for u when i;m trying to "view" to info notification of team accept my challenge request

## Match rules (redux and triggers) take care about it
- [x] "IMPORANT" in triggers should work just for match type classic_match
- [x] you can't edit on a match if the match is already started
- [x] match can't be started until both coach aggree with info and refree accept info
- [x] a callable function fo updating match details by one of coachs or refree
- [x] this callable functin work just with classic_matchs
- [x] possiblety edit for coaches is just in the "coachs_edit" status
- [x] the function will update the match details and send notifications to the other coach
- [x] possiblety edit for refree is just in the "in_progress" status
- [x] send notification to the coachs when refree make (edit result, or cancel match, or end match actions)
- [x] both accept is where the matchdata === udpateData and and other coach is aggredd
-      => make match in refree waiting status when both coachs agree on the match details
-      and send invite request to selected refree
- [x] the match edit_result or end can't be done if the match is not in progress
- [x] refree can update status match to in progress
- [ ] if you canceled the match before start it's will be deleted, 
- [ ] you can't leave it if it in progress 
- [ ] if you leave match before match start it's will be called as draw
- [ ] refree can't change account if it has a pending match
- [ ] match started at + 2h duree should not have any another start in  match 

## triggers
- [ ] Notification accepted
    - [x] Request to join team
    - [x] Invite to team
    - [x] match challenge
    - [x] invite refree to match + decline
    - [ ] request to join tournament
    - [ ] invite to tournament
- [x] on Member joined or leaved a team
- [x] on role if member change to coach update the user account type to coach too
- [x] on role if coach change to member update the user account type to member too
- [x] Notification Triggers (match challenge)
- [x] change account type when  change coach for new coach and the old one
- [ ] is not possible to ajout or leave team for coach it's need to change coach first and set one of members or delete team
- [ ] match update
    - [ ] on match start
        - [ ] send notification to all members 
    - [ ] on match end
        - [ ] send notification to all members
- [ ] if coach left the team (some how) the oldest member will be the coach if no members found the team will be deleted
- [x] notification of coach change should be sent to all members
- [ ] trriger notification on invite refree to match can be aceepted if the refree have a match in same time
- [x] team logos should upload to team logos folder

## Triggers Next update add:
    - [ ] check if there is a already pending request match challenge from same teams


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



## logic later tasks
- [ ] username should base unique in lower case
- [ ] team name should be unique in lower case
- [ ] update the message of notification to contain info username or team name not userid
// search in match where team1.id or team2.id === match.team1.id or match.team2.id check in not finsish or cancled matches (this matchs should have difreent duree time from now 2 hours at least)
- 



## futures
- [ ] relive a team (only for deleted team and can be done by only the createdBy user)

 
