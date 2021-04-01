# Git Viewer Challenge
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/68cf1aec60d24ebab1736b4ca28083e2)](https://www.codacy.com/gh/lucassklp/git-viewer-challenge/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=lucassklp/git-viewer-challenge&amp;utm_campaign=Badge_Grade)

The goal for this project is to retrieve a paged list of commits given a github url

## Assumptions
1. I must rely on **Git Cli**. This is important because if I didn't have this constraint I'd choose something safer like [nodegit](https://github.com/nodegit/nodegit). Relying on a **Cli** is potencially dangerous when you have to expose anything to web due to [RCE Vulnerability](https://www.sciencedirect.com/topics/computer-science/remote-code-execution). In order to mitigate it, I added params validator but it's not enough.
2. I must integrate with [GitHub Rest API](https://docs.github.com/en/rest) and use **Local Git** as fallback.

## How to run

```bash
npm install
npm start
```

## How to run the tests
```bash
npm run test
```

## How to run lint
```bash
npm run lint
```

## Making a HTTP Request

In order to see the WebApi working, all you need to do is a *GET Request* like this:

```
localhost:3000?url=https://github.com/lucassklp/Rx.Http&page=0&pageSize=10
```

The parameters are passed by *query param* which are

**url**: The GitHub project's URL

**page**: the number of page

**pageSize**: The amount of commit to display

## Other considerations
1. As can be checked [here](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/git-clone.html) the ```git clone``` command sends the progress to the **error stream** That's why I just added ```--quiet``` flag to this command in order to avoid error on stream
2. Pages are zero-based numbering (starts by 0 until n-1).