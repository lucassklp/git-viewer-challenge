# Git Viewer Challenge

The goals for this project is to retrieve a list of commits given a github url

## Assumptions
1. I must rely on **Git Cli**. This is important because if I didn't have this constraint I'd choose something safer like [nodegit](https://github.com/nodegit/nodegit). Relying on a **Cli** is potencially dangerous when you have to expose anything to web due to [RCE Vulnerability](https://www.sciencedirect.com/topics/computer-science/remote-code-execution).


## How to run

```bash
npm install
npm start
```


## Other considerations
1. As can be checked [here](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/git-clone.html) the ``` git clone``` command sends the progress to the **error stream** That's why I just added ```--quiet``` flag to this command in order to avoid error on stream
