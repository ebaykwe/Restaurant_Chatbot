document.addEventListener('DOMContentLoaded', function() {
    const chatbox = document.getElementById('chatbox');
    const userInput = document.getElementById('userInput');
    let state = { mode: 'mainMenu' }; 

    function addMessage(text, sender) {
        const message = document.createElement('div');
        message.classList.add('message', sender);
        message.innerHTML = text;
        chatbox.appendChild(message);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function sendMessage() {
        const text = userInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            handleUserInput(text);
            userInput.value = '';
        }
    }

    function handleUserInput(input) {
        switch (state.mode) {
            case 'mainMenu':
                handleMainMenu(input);
                break;
            case 'ordering':
                addItemToOrder(input);
                break;
            
            default:
                addMessage('Invalid action. Please select a valid option.', 'bot');
        }
    }

    function handleMainMenu(input) {
        switch (input) {
            case '1':
                state.mode = 'ordering';
                fetchMenu();
                break;
            case '99':
                checkoutOrder();
                break;
            case '98':
                getOrderHistory();
                break;
            case '97':
                getCurrentOrder();
                break;
            case '0':
                cancelOrder();
                break;
            default:
                addMessage('Invalid option. Please try again.', 'bot');
        }
    }

    function fetchMenu() {
        fetch('http://localhost:3000/menu')
            .then(response => response.json())
            .then(data => {
                const menuItems = data.items.map(item => `${item.id}. ${item.name} - ${item.price}`).join('<br>');
                addMessage(`Here are our menu items:<br>${menuItems}`, 'bot');
                addMessage('Please select an item number to add to your order.', 'bot');
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
                addMessage('Error fetching menu items', 'bot');
            });
    }

    function addItemToOrder(itemId) {
        fetch('http://localhost:3000/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemId: parseInt(itemId) })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.message, 'bot');
            addMessage('Select 1 to add another item<br>Select 99 to checkout order<br>Select 98 to see order history<br>Select 97 to see current order<br>Select 0 to cancel order', 'bot');
            state.mode = 'mainMenu'; 
        })
        .catch(error => {
            console.error('Error adding item to order:', error);
            addMessage('Error adding item to order', 'bot');
            state.mode = 'mainMenu'; 
        });
    }

    function checkoutOrder() {
        fetch('http://localhost:3000/checkout', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                addMessage(data.message, 'bot');
                state.mode = 'mainMenu'; 
            })
            .catch(error => {
                console.error('Error during checkout:', error);
                addMessage('Error during checkout', 'bot');
                state.mode = 'mainMenu'; 
            });
    }

    function getOrderHistory() {
        fetch('http://localhost:3000/order-history')
            .then(response => response.json())
            .then(data => {
                const orderHistory = data.history.map(order => `Order #${order.id}: ${order.items.join(', ')}`).join('<br>');
                addMessage(`Your order history:<br>${orderHistory}`, 'bot');
            })
            .catch(error => {
                console.error('Error fetching order history:', error);
                addMessage('Error fetching order history', 'bot');
            });
    }

    function getCurrentOrder() {
        fetch('http://localhost:3000/current-order')
            .then(response => response.json())
            .then(data => {
                const currentOrder = data.items.join(', ');
                addMessage(`Your current order:<br>${currentOrder}`, 'bot');
            })
            .catch(error => {
                console.error('Error fetching current order:', error);
                addMessage('Error fetching current order', 'bot');
            });
    }

    function cancelOrder() {
        fetch('http://localhost:3000/cancel-order', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                addMessage(data.message, 'bot');
                state.mode = 'mainMenu'; 
            })
            .catch(error => {
                console.error('Error canceling order:', error);
                addMessage('Error canceling order', 'bot');
                state.mode = 'mainMenu'; 
            });
    }

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    window.sendMessage = sendMessage;
});
