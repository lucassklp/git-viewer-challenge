import { GitUrlMetadata } from "../models/git-url-metadata";

export const githubRegex = /^((http[s]?|git)(:\/\/|@))?([^\/:]+)[\/:]([^\/:]+)\/(.+)$/s;

export function extract(url: string): GitUrlMetadata {
    if(!url.match(githubRegex)){
        throw new Error('Not a valid github url was provided')
    }
    const groups = githubRegex.exec(url);
    return  {
        owner: groups[5],
        repository: groups[6]
    }
}
