/** @jsx React.DOM */
var React       = require('react');
var EmailTmp    = require('EmailTmp');

var EmailList = React.createClass({

  getInitialState: function() {
    return {
      pictures:  [],
      favorites: []
    };
  },

  componentDidMount: function () {
    var self = this;
    var url = 'https://api.instagram.com/v1/media/popular?client_id=642176ece1e7445e99244cec26f4de1f&callback=?';

    $.getJSON(url, function(result){

        if(!result || !result.data || !result.data.length){
          return;
        }

        var pictures = result.data.map(function(p){

            return {
                id: p.id,
                url: p.link,
                src: p.images.low_resolution.url,
                title: p.caption ? p.caption.text : '',
                favorite: false
            };

        });

        // Update the component's state. This will trigger a render.
        // Note that this only updates the pictures property, and does
        // not remove the favorites array.

        self.setState({ pictures: pictures });

    });
  },


  render: function(){
    var self = this;

    var pictures = this.state.pictures.map(function(p){
      return <EmailTmp ref={p.id} src={p.src} title={p.title} />
    });

    return (
      <section className="email-list">
        <header className="current-folder">
          <h1>Inbox</h1>
        </header>
        <ul>
          {pictures}
        </ul>
      </section>
    );
  },
});


module.exports = EmailList;