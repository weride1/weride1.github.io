---
title: "用 Python 实现审计抽样自动化"
date: "2026-04-28"
summary: "分享如何用 Python 脚本替代手工抽样，将原本需要半天的工作缩短到 5 分钟。"
tags: ["Python", "审计", "自动化"]
---

## 背景

每年年审期间，审计抽样都是一项重复且耗时的工作。传统方式是在 Excel 中手动筛选、排序、随机取数，不仅效率低，还容易出错。

## 方案

使用 Python 的 `pandas` 库读取账套数据，结合 `numpy.random` 实现分层随机抽样：

```python
import pandas as pd
import numpy as np

def stratified_sample(df, stratum_col, n_per_stratum=5):
    return df.groupby(stratum_col, group_keys=False).apply(
        lambda x: x.sample(n=min(n_per_stratum, len(x)), random_state=42)
    )
```

## 效果

- 原来需要 4 小时的抽样工作，现在 5 分钟完成
- 可复用、可追溯、可审计
- 同事们再也不用担心抽样结果被质疑了
