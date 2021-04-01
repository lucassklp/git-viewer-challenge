import { UrlMetadata } from "../models/url-metadata";

export function githubRegex(): RegExp {
    return new RegExp(/^((http[s]?|git)(:\/\/|@))?([^\/:]+)[\/:]([^\/:]+)\/(.+)$/s);
}

export function extract(url: string): UrlMetadata {
    const groups = githubRegex().exec(url);
    return  {
        owner: groups[5],
        repository: groups[6]
    }
}
