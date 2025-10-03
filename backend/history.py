class History:
    def __init__(self):
        self.all_history = {}
    
    def add(self, s: str):
        if s in self.all_history:
            self.all_history[s] += 1
        else:
            self.all_history[s] = 1
        return
    
    def top(self, n: int):
        sorted_items = sorted(self.all_history.items(), 
                            key=lambda x: x[1], 
                            reverse=True)
        
        top_n = dict(sorted_items[:n])
        return top_n
    
    def get_all_history(self):
        return self.all_history
    
    def get_top_20(self):
        return self.top(20)
    
    def clear(self):
        self.all_history.clear()
    
    def remove(self, s: str):
        if s in self.all_history:
            del self.all_history[s]
        return
    
    def __str__(self):
        return f"All history: {self.all_history}\nTop 20: {self.top(20)}"