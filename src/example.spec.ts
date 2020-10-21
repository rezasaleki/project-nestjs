class FriendList {
    public friends = [];

    addFriend(name: string): void {
        this.friends.push(name);
        this.announceFriendShip(name);
    };

    announceFriendShip(name: string): void {
        global.console.log(`${name} is now a friend!`);
    }

    removeFriend(name: string): void {
        let idx = this.friends.indexOf(name);
        if (idx === -1) {
            console.log("Friend Not Found !"); // throw new Error('Not Found !')
        }
        this.friends.splice(idx, 1);
    }
}

// Resources :  https://jestjs.io/

describe('FriendsList', () => {

    let friendList;

    beforeEach(() => {
        friendList = new FriendList();
    });

    it('initialize friends list', () => {
        expect(friendList.friends.length).toEqual(0);
    });

    it('add friend to list', () => {
        friendList.addFriend("reza saleki");
        expect(friendList.friends.length).toEqual(1);
    });

    it('annouce friend ship', () => {
        friendList.announceFriendShip = jest.fn();
        expect(friendList.announceFriendShip).not.toHaveBeenCalled();
        // expect(friendList.announceFriendShip).toHaveBeenCalled();
        friendList.addFriend("massi");
        expect(friendList.announceFriendShip).toHaveBeenCalledWith('massi');
    });

    describe('removeFriend', () => {
        it('reomves a friend from the list', () => {
            friendList.addFriend('rezasaleki');
            expect(friendList.friends[0]).toEqual('rezasaleki');
            friendList.removeFriend('rezasleki');
            expect(friendList.friends[0]).toBeUndefined();
        });

        it('throws an error as friends does not exist', () => {
            // expect(() => friendList.removeFriend('rezasleki')).toThraow(new Error('Friend Not Found !'));
        });
    })
});




describe('my test', () => {
    it('returns true', () => {
        expect(true).toEqual(true);
    });
});
