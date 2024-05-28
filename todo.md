# Project Todo List

## what i can do:

create account
update account info
create team
change account type
open profile page
open team page
authentication
search on users
search on teams 
update team info
style profile page
create team error handling


## what i need to add;

- Notifications redux actions
    - [x] request to join team
    - [ ] request to join tournament
    - [ ] match Challenge
    - [ ] invite to tournament
    - [x] invite to team
    - [x] info notifiaction
- Add Notification to notification aside

- kick player
- ban player
- change coach
- leave team
- team details => show hidden team info
- member details => show hidden member info

- invite team member
- update isAlreadyInTeam function in authSlice to use __name__ way like in teamSlice


## was working on:


@@ilorez => request to join team notification
@@Abdo-Nsila => tournament optimize brackets component
@@Wahmane-Hamza => team search  page
@@Merieme => Rapport (3 Chapitres)

## firebase rules should add:
- teams:
    - for edit/invite/acceptRequests on team the uid of editor should be the coach
- notifications:
    - check if the sender is right one (for example the coach of team is only one who can send request to join team)
- users:
    - check if uid === uid of user that want to edit his data


    
    


