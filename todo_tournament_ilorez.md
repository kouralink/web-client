## redux actions

- [x] : @ilorez : update create tournament form add loading and handle errors
- [ ] : @ilorez : update create tournament -> navigate to tournament page
- [ ] : @ilorez : create update tournament page page
- [x] : @Abdo-Nsila : get tournament info
- [x] : @Abdo-Nsila : get tournament teamsinfo
- [x] : @Abdo-Nsila : get tournament refreesinfo
- [x] : @ilorez : request to join tournament for team
- [x] : @ilorez : invite team
- [ ] : leave tournament for team (require firebase callback function)
- [x] : @Abdo-Nsila : kick team
- [ ] : @ilorez : invite refree to tournament
- [ ] : @ilorez : leave tournament for refree !(in progress)
- [ ] : @ilorez : get tournament notification for tournament manager redux
- [ ] : @ilorez : add notification to notifiaction aside
- [ ] : @ilorez : link notification actions with redux
- [ ] : @Abdo-Nsila : update tournament info
- [ ] : change account type logic for tournament_manager

status : pending => in progress => finish || failed

## Triggers (in pending status)

- [ ] tournament manager:
  - accept request (add teamid to particiapants)
- [ ] refree:
  - accept invitation (add refree id to refrees_ids)
- [ ] team:
  - accept invitation (add teamid to particiapants)
- [ ] leave tournament for team (remove teamid from particiapants)
- [ ] kick team (remove teamid from particiapants)
- [ ] : change account type logic for tournament_manager

## Tournamnet firesore rules

- [ ] allow read for all
- [ ] allow write: if request.auth.uid == resource.data.manager_id

## Rules For Update

- [ ] Refree can't change account if it was in a tournament
- [ ] Team can't join team if the member of team under tournament min members

