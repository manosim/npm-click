import React, { Component } from 'react'; // eslint-disable-line no-unused-vars


export default class About extends Component {
  render() {
    return (
      <div className="container-fluid section-welcome">
        <div className="row">
          <div classname="col-md-12">
            <h1>Comparing NPM (dev) Dependencies</h1>
            <h2>All you need is your package.json. That's all!</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <img src="dist/images/npm-logo.png" className="img-responsive" />
            <p className="lead">
              NPM is awesome! We all use it. Dependencies get updated daily so
              if you want to be up to date, you are at the right place.
            </p>
          </div>

          <div className="col-md-4">
            <img src="dist/images/packagejson.png" className="img-responsive" />
            <p className="lead">
              Got your package.json? Drop it on the search bar, copy & paste its
              content to the text box or use the upload. Whatever works for you...
              'Submit' and that's all!
            </p>
          </div>

          <div className="col-md-4">
            <img src="dist/images/results.png" className="img-responsive" />
            <p className="lead">
              Still not convienced? There's a 'demo' button next to the search form.
              Yeap that red one. Click and see what happens!
            </p>
          </div>
        </div>
      </div>
    );
  }
};
