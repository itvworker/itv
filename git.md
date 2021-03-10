```
git checkout <分支名>  //切换分支
git checkout -b <分支名> //新建分支
git push origin <分支名> -u //提交新的分支
git push origin --delete <分支名> //删除远程分支名
git merge <被合并的分支名> //合并到分支
git branch -d <分支名> //删除本地分支

λ git branch -h
usage: git branch [<options>] [-r | -a] [--merged | --no-merged]
   or: git branch [<options>] [-l] [-f] <branch-name> [<start-point>]
   or: git branch [<options>] [-r] (-d | -D) <branch-name>...
   or: git branch [<options>] (-m | -M) [<old-branch>] <new-branch>
   or: git branch [<options>] [-r | -a] [--points-at]


Generic options
    -v, --verbose         show hash and subject, give twice for upstream branch
    -q, --quiet           suppress informational messages
    -t, --track           set up tracking mode (see git-pull(1))
    --set-upstream        change upstream info
    -u, --set-upstream-to <upstream>
                          change the upstream info
    --unset-upstream      Unset the upstream info
    --color[=<when>]      use colored output
    -r, --remotes         act on remote-tracking branches
    --contains <commit>   print only branches that contain the commit
    --abbrev[=<n>]        use <n> digits to display SHA-1s

Specific git-branch actions:
-a, --all             list both remote-tracking and local branches
-d, --delete          delete fully merged branch
-D                    delete branch (even if not merged)
-m, --move            move/rename a branch and its reflog
-M                    move/rename a branch, even if target exists
--list                list branch names
-l, --create-reflog   create the branch's reflog
--edit-description    edit the description for the branch
-f, --force           force creation, move/rename, deletion
--merged <commit>     print only branches that are merged
--no-merged <commit>  print only branches that are not merged
--column[=<style>]    list branches in columns
--sort <key>          field name to sort on
--points-at <object>  print only branches of the object
```

https://zhuanlan.zhihu.com/p/71163868