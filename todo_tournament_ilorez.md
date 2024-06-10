## redux actions

- [x] : @ilorez : update create tournament form add loading and handle errors
- [x] : @ilorez : update create tournament -> navigate to tournament page
- [x] : @Abdo-Nsila : create update tournament page page
- [x] : @ilorez : navigate to tournament page after update
- [x] : @Abdo-Nsila : get tournament info
- [x] : @Abdo-Nsila : get tournament teamsinfo
- [x] : @Abdo-Nsila : get tournament refreesinfo
- [x] : @ilorez : request to join tournament for team
- [x] : @ilorez : invite team
- [x] : @Abdo-Nsila : kick team
- [x] : @ilorez : invite refree to tournament
- [x] : @ilorez : get tournament notification for tournament manager redux
- [x] : @ilorez : add notification to notifiaction aside
- [x] : @ilorez : link notification actions with redux
- [x] : @Abdo-Nsila : update tournament info
- [x] : @ilorez : change account type logic for tournament_manager
- [ ] : leave tournament for refree !(in progress) (require firebase callback function)
- [ ] : leave tournament for team !(in progress) (require firebase callback function)
- [x] : @Wahmane-Hamza : Create referee matches UI
- [x] : @ilorez : get matches list and link it with UI

status : pending => in progress => finish || failed

## Triggers (in pending status)

- [x] tournament manager:
  - accept request (add teamid to particiapants)
- [x] refree:
  - accept invitation (add refree id to refrees_ids)
- [x] team:
  - accept invitation (add teamid to particiapants)
- [x] kick team (remove teamid from particiapants)
- [x]  change account type logic for tournament_manager
- [ ] leave tournament for team (remove teamid from particiapants)
- [ ] leave tournament for refree (remove refreeid from refrees_ids)

## Tournamnet firesore rules
- [ ] allow read for all
- [ ] allow write: if request.auth.uid == resource.data.manager_id
- [ ] disable write for all in in progress or finished or canceled tournament status

## Rules For Update
- [ ] Refree can't change account if it was in a tournament
- [ ] Team can't join tournament if the member of team under tournament min members
- [ ] only tournament manager can change tournament info
- [ ] no one can change in tournament info if it was in progress or finished


## Front end rules should update
- [ ] the only tournament manager can open update page
- [ ] teamName and username should not contain spaces


## Triggers should update
- [ ] teamName and username should not contain spaces
  - [x] update zod validation for create and update 0/3
  - [x] update redux checks 0/4
  - [ ] update firebase functions 0/4
- [ ] make start in === the time when the referee start the match or set in progress


## change account type for tournament_manager
- [x] update redux
- [x] update callback function
- [x] update referee redux
- [x] update referee callback function