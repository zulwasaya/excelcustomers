Customers = new Meteor.Collection("customers");

Meteor.methods({
   upimportance: function (customerId) {
       var cust = Customers.findOne(customerId);


       Customers.update(customerId,
           {$set: {importance: cust.importance = parseInt(cust.importance +1) }});
   },
   downimportance: function (customerId) {
       var cust = Customers.findOne(customerId);
       Customers.update(customerId,
           {$set: {importance: cust.importance = parseInt(cust.importance -1) }});
   }

});

if (Meteor.isClient) {
    Meteor.subscribe("customers");


    Template.customersList.customer = function () {
        return Customers.find({}, {sort: {importance: -1 }});

    };

    Template.totalCustomers.totalNumber = function () {

        return Customers.find().count();


    };

    Template.customersList.events ({
        "click .upimportance": function () {
        Meteor.call("upimportance", this._id);
    },
        "click .downimportance": function () {
            Meteor.call("downimportance", this._id);
    },
        "click a.delete": function (e) {
            e.preventDefault();
            Customers.remove( this._id);
    }

  });

    Template.newCustomer.events ({
        "submit .newCustomerForm": function (evt) {
            evt.preventDefault();
            Customers.insert({
                firstname: $(".firstname").val(),
                surname: $(".surname").val(),
                email: $(".email").val(),
                telephone: $(".telephone").val(),
                address: $(".address").val(),
                postcode: $(".postcode").val(),
                importance: $(".importance").val(),
                comments: $(".comments").val()

            }, function (err) {
                if (! err)
                    $("input[type=text]").val();
            });
        }

    });

}





if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

    Meteor.publish("customers",function () {
        return Customers.find();

    });


    Customers.allow({
        insert: function (userId, customer){
            return customer.owner !== userId;
        },
        remove: function (userId, customer){
            return customer.owner !== userId;
        }

    });
}
