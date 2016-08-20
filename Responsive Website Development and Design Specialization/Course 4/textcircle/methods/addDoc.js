Meteor.methods({
    addDoc: function() {
        var doc;
        var id;

        if (!this.userId) { //not logged in
            return;
        }

        doc = {
            owner: this.userId,
            createdOn: new Date(),
            title: 'new doc'
        };

        id = Documents.insert(doc);

        console.log('id',id);

        return id;
    }
});
