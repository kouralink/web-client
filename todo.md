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
    - [ ] Change coach 
    - [ ] match Challenge
    - [ ] request to join tournament
    - [ ] invite to tournament
    
- [x] Create Notifiaction UI
- [x] Add Notifications to notification aside
- [ ] shout some default users and teams in search page.
- [ ] hidde create Team btn when the user is not a coach
- [ ] leave team for Members
- [ ] create Notificaiton Accept and View and Decline actions
- [ ] Notification Triggers
- [ ] Members Join & Leave Triggers
- [ ] add Alert confirmation for the actions like ban , leave, kick
- [ ] Leave Team For Coach (set Coach the older member)
- [ ] Member can't join team if was in blacklist
- [ ] add Ban List to team page for make possible to remove someone from black list 
- [ ] team details => show hidden team info 
- [ ] member details => show hidden member info
- [ ] create new match form
- [ ] new match redux state and thunks (require match challenge notification)
- [ ] match triggers (update on notification update trigger to include match_chalenege notificaiton type)



## firebase rules should add:
- teams:
    - for edit/invite/acceptRequests on team the uid of editor should be the coach
- notifications:
    - check if the sender is right one (for example the coach of team is only one who can send request to join team)
- users:
    - check if uid === uid of user that want to edit his data


    
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
    


