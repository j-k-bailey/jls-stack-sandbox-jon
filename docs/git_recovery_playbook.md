# Git Recovery Playbook (Triage)

## Check First

- `git branch` → What branch am I on?
- `git status` → Clean or dirty?
- `git log --oneline --graph -n 5` → Where is `HEAD`?
- Was it **pushed**?
- Is this **main/shared branch**?

---

## Decision Tree

```txt
START
│
├─ Was it pushed?
│   │
│   ├─ NO (local only)
│   │   │
│   │   ├─ Just committed, regret it?
│   │   │     → git reset --soft HEAD~1
│   │   │
│   │   └─ Commits messy / want redo?
│   │         → git reset --hard <commit>
│   │         (or --soft to preserve changes)
│   │
│   └─ YES (already on remote)
│       │
│       ├─ On main / shared branch?
│       │     → git revert <commit>
│       │
│       ├─ Multiple commits?
│       │     → git revert <old>^..<new>
│       │
│       └─ PR merged to main?
│             → git revert -m 1 <merge_commit>
│
END
```

---

## Rule of Thumb

| Situation      | Command       | Rewrites History?  |
| -------------- | ------------- | ------------------ |
| Local mistake  | `reset`       | Yes (safe locally) |
| Shared branch  | `revert`      | No                 |
| Undo merged PR | `revert -m 1` | No                 |
