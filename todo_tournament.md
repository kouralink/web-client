## redux actions

- [ ] : @ilorez : update create tournament form add loading and handle errors and navigate to tournament page
- [ ] : @ilorez : create update tournament page page
- [ ] : @Abdo-Nsila : get tournament info
- [ ] : get tournament teamsinfo
- [ ] : get tournament refreesinfo
- [ ] : @ilorez : request to join tournament for team
- [ ] : @ilorez : invite team
- [ ] : leave tournament for team (require firebase callback function)
- [ ] : kick team
- [ ] : @ilorez : invite refree to tournament
- [ ] : @ilorez : leave tournament for refree !(in progress)
- [ ] : @ilorez : get tournament notification for tournament manager redux
- [ ] : @ilorez : add notification to notifiaction aside
- [ ] : @ilorez : link notification actions with redux
- [ ] : update tournament info

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

## Tournamnet firesore rules

- [ ] allow read for all
- [ ] allow write: if request.auth.uid == resource.data.manager_id

## Rules For Update

- [ ] Refree can change account if it was in a tournament
