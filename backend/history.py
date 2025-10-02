class History:
    def __init__(self):
        self.top_20_history = {}
        self.all_history = {}
    
    def add(self, s: str):
        """添加搜索记录"""
        if s in self.all_history:
            self.all_history[s] += 1
        else:
            self.all_history[s] = 1
        return
    
    def top(self, n: int):
        """获取前n个最频繁的搜索记录"""
        # 按搜索频率降序排序
        sorted_items = sorted(self.all_history.items(), 
                            key=lambda x: x[1], 
                            reverse=True)
        
        # 取前n个
        top_n = dict(sorted_items[:n])
        self.top_20_history = top_n  # 更新top_20_history
        return top_n
    
    def get_all_history(self):
        """获取所有历史记录"""
        return self.all_history
    
    def get_top_20(self):
        """获取top20历史记录"""
        return self.top(20)
    
    def clear(self):
        """清空所有历史记录"""
        self.top_20_history.clear()
        self.all_history.clear()
    
    def remove(self, s: str):
        """删除特定搜索记录"""
        if s in self.all_history:
            del self.all_history[s]
            # 如果也在top_20中，也删除
            if s in self.top_20_history:
                del self.top_20_history[s]
        return
    
    def __str__(self):
        return f"All history: {self.all_history}\nTop 20: {self.top_20_history}"