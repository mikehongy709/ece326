// document.addEventListener('DOMContentLoaded', function() {
//     const searchForm = document.getElementById('searchForm');
//     const searchInput = document.getElementById('searchInput');
//     const searchButton = document.getElementById('searchButton');
//     const searchResults = document.getElementById('searchResults');
//     const resultsContainer = document.getElementById('resultsContainer');
//     const loadingIndicator = document.getElementById('loadingIndicator');
    
    
//     // Function to perform search
//     async function performSearch(query) {
//         // Show loading indicator
//         loadingIndicator.style.display = 'block';
//         searchResults.style.display = 'none';
//         console.log('performing search')
//         // Simulate API call delay
//         setTimeout(async () => {
//             // Clear previous results
//             resultsContainer.innerHTML = '';
            
//             // Filter sample data based on query
//             const response = await fetch('/query?q=' + encodeURIComponent(query));
        
//             // 检查响应状态
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
            
//             // 解析 JSON - 这里需要 await 和括号
//             const data = await response.json();
//             console.log('Received data:', data);
            
//             // 根据你的后端响应结构调整
//             // 假设后端返回 {data: "query", status: "success"} 或 {results: [...]}
//             let results = [];
            
//             if (data.results) {
//                 results = data.results;  // 如果后端返回 results 数组
//             } else if (data.data && Array.isArray(data.data)) {
//                 results = data.data;     // 如果后端返回 data 数组
//             } else if (data.data) {
//                 // 如果 data 是字符串或其他类型，包装成数组
//                 results = [{ title: data.data, snippet: `Search result for: ${data.data}` }];
//             } else {
//                 results = [];
//             }

//             var filteredResults = results
            
//             // Display results
//             if (filteredResults.length > 0) {
//                 filteredResults.forEach(result => {
//                     const resultElement = document.createElement('div');
//                     resultElement.className = 'result-item';
//                     resultElement.innerHTML = `
//                         <div class="result-title">${result.title}</div>
//                         <div class="result-snippet">${result.snippet}</div>
//                     `;
//                     resultsContainer.appendChild(resultElement);
//                 });
//             } else {
//                 resultsContainer.innerHTML = '<div class="no-results">No results found for your query. Try different keywords.</div>';
//             }
            
//             // Hide loading indicator and show results
//             loadingIndicator.style.display = 'none';
//             searchResults.style.display = 'block';
//         }, 1000);
//     }
    
//     // Handle form submission
//     searchForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         const query = searchInput.value.trim();
        
//         if (query) {
//             performSearch(query);
//         }
//     });
    
//     // Enable/disable search button based on input
//     searchInput.addEventListener('input', function() {
//         searchButton.disabled = !this.value.trim();
//     });
    
//     // Initialize with disabled button
//     searchButton.disabled = true;
// });


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
    get_top_20_history() 
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