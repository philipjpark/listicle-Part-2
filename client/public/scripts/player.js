const renderPlayer = async () => {
    const requestedID = parseInt(window.location.href.split('/').pop())
  
    const response = await fetch('/players')
    const data = await response.json()
  
    const giftContent = document.getElementById('player-content')
  
    let player
  
    player = data.find(player => player.id === requestedID)
  
    if (player) {
      document.getElementById('image').src = player.image
      document.getElementById('name').textContent = player.name
      document.getElementById('submittedBy').textContent = 'Submitted by: ' + player.submittedBy
      document.getElementById('submittedOn').textContent = 'Submitted on: ' + player.submittedOn
      document.getElementById('height').textContent = 'Height: ' + player.height
      document.getElementById('weight').textContent = 'Weight: ' + player.weight
      document.getElementById('position').textContent = 'Position: ' + player.position
      document.getElementById('club').textContent = 'Club: ' + player.club
      document.getElementById('confederation').textContent = 'Confederation: ' + player.confederation
      document.title = `Listicle - ${player.name}`
    }
    else {
      const message = document.createElement('h2')
      message.textContent = 'No Players Available 😞'
      giftContent.appendChild(message)   
    }
  }
  
  renderPlayer()
  