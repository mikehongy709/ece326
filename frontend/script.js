document.addEventListener("DOMContentLoaded", () => {
    historyDropdown.style.display = "none"
})


const dropdownBtn = document.getElementById("dropdownButton");
const historyDropdown = document.getElementById("searchHistoryDropdown");
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const resultsContainer = document.getElementById('results');
const loadingIndicator = document.getElementById('loadingIndicator');
const historyTable = document.getElementById('history')

searchButton.disabled = true

dropdownBtn.addEventListener("click", () => {
    if (historyDropdown.style.display === "none") {
       get_top_20_history()  
    } else {
       clear_history()
    }
    historyDropdown.style.display = 
    historyDropdown.style.display === "block" ? "none" : "block";
    
});

function get_top_20_history() {
    fetch('/history')
  .then(response => response.json()) 
  .then(data => {
      console.log("历史结果：", data);
      show_history(data)
  })
  .catch(error => {
      console.error("请求失败：", error);
  });
}

function show_history(data) {
    if (data) {
        for (let key in data) {
            const resultElement = document.createElement('tr');
            // resultElement.className = 'result-item';
            console.log(key + "~" + data[key])
            resultElement.innerHTML = `
                <td>${key}</td>
                <td>${data[key]}<td>
            `;
            historyTable.appendChild(resultElement);
        }
    } else {
        historyTable.innerHTML = '';
    }
}

function clear_history() {
    historyTable.innerHTML = ''
}

searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    resultsContainer.innerHTML = ''
    loadingIndicator.style.display = 'block';
    searchResults.style.display = 'none';
    const query = searchInput.value.trim();
    if (query){
        submitQuery(query)
    }
    loadingIndicator.style.display = 'none';
    searchResults.style.display = 'block';
})

function submitQuery(query){
  fetch('/query?q='+query)
  .then(response => response.json()) 
  .then(data => {
      console.log("搜索结果：", data.result);
      //把 data 渲染到页面上
      activateResult(data.result)
  })
  .catch(error => {
      console.error("请求失败：", error);
  });
}

function activateResult(dict) {
        // Display results
    if (dict) {
        for (let key in dict) {
            const resultElement = document.createElement('tr');
            // resultElement.className = 'result-item';
            resultElement.innerHTML = `
                <td>${key}</td>
                <td">${dict[key]}</td>
            `;
            resultsContainer.appendChild(resultElement);
        }
    } else {
        resultsContainer.innerHTML = '<div class="no-results">No results found for your query. Try different keywords.</div>';
    }
}

// Enable/disable search button based on input
searchInput.addEventListener('input', function() {
    searchButton.disabled = !this.value.trim();
});


dropdownBtn.addEventListener('click', function() {

})