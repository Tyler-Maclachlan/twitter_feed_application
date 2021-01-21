export class User {
    private _name: string;
    private _following: string[];

    public get name(): string {
        return this._name;
    }

    public get following(): string[] {
        return this._following;
    }

    public constructor(name: string) {
        this._name = name;
        this._following = [];
    }

    public addFollows(name: string): void {
        if (!this._following.includes(name)) {
            this._following.push(name);
        }
    }

    public isFollowing(name: string): boolean {
        return this._following.includes(name);
    }
}