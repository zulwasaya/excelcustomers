Customers = new Meteor.Collection("customers");

if (Meteor.isClient) {
    Meteor.subscribe("customers");
    Template.customersList.customer = function () {
        return Customers.find();
    };
}




if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

    Meteor.publish("customers",function () {
        return Customers.find();

    });
}
