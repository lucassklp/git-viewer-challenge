import { expect } from 'chai';
import { GitViewer } from '../src/core/git-viewer';
import { GitHubCliViewer } from '../src/core/github-cli-viewer';
import { GitHubApiViewer } from '../src/core/github-api-viewer';
import { zip } from 'rxjs';

describe('GitHub Cli Viewer Tests', () => {
    it("should get 1 item from pagination", () => {
        should_get_1_item(new GitHubCliViewer());
    });
    it('should throw error invalid git url', () => {
        should_throw_error_invalid_git_url(new GitHubApiViewer());
    });
});

describe('GitHub Api Viewer Tests', () => {
    it("should get 1 item from pagination", () => {
        should_get_1_item(new GitHubApiViewer());
    });
    it('should throw error invalid git url', () => {
        should_throw_error_invalid_git_url(new GitHubApiViewer());
    });
});

describe('GitHub Viewer Tests', () => {
    it("Api and Cli must to return same result", () => {
        const cli = new GitHubCliViewer();
        const api = new GitHubApiViewer();
        const url = 'https://github.com/lucassklp/Rx.Http';
        const page = 2;
        const pageSize = 3;
        zip(cli.getCommits(url, page, pageSize), api.getCommits(url, page, pageSize)).subscribe(res => {
            const cliRes = res[0];
            const apiRes = res[1];

            expect(cliRes).to.deep.equal(apiRes);
        });
    });
});


// tslint:disable-next-line: variable-name
const should_get_1_item = (viewer: GitViewer) => {
    return () => {
        viewer.getCommits('https://github.com/lucassklp/Rx.Http', 0, 1).subscribe(commits => {
            expect(commits.length).equal(1);
        });
    }
}

// tslint:disable-next-line: variable-name
const should_throw_error_invalid_git_url = (viewer: GitViewer) => {
    return () => {
        viewer.getCommits('https://github.com/not_a_repo_path', 0, 1).subscribe(_ => null, err => {
            expect(err).not.null;
        });
    }
}