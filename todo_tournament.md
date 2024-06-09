## redux actions

- [ ] : @ilorez : update create tournament form add loading and handle errors and navigate to tournament page
- [ ] : @ilorez : create update team page
- [ ] : @Abdo-Nsila : get tournament info
- [ ] : get tournament teamsinfo
- [ ] : get tournament refreesinfo
- [ ] : request to join tournament for team
- [ ] : invite team
- [ ] : leave tournament for team
- [ ] : kick team
- [ ] : invite refree to tournament
- [ ] : leave tournament for refree !(in progress)
- [ ] : get tournament notification for tournament manager redux
- [ ] : add notification to notifiaction aside
- [ ] : link notification actions with redux
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
