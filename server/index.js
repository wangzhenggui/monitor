/*
 * @Author: wangzhenggui jianjia.wzg@raycloud.com
 * @Date: 2022-11-21 15:39:58
 * @LastEditors: wangzhenggui jianjia.wzg@raycloud.com
 * @LastEditTime: 2022-11-22 14:49:31
 * @FilePath: /monitor/server/index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by wangzhenggui jianjia.wzg@raycloud.com, All Rights Reserved. 
 */
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.post('/apiReport', (req, res) => {
    console.log(req.body)
    res.send({
        success: true,
        status: 200,
    })
})

app.post('/api/testSure', (req, res) => {
    res.send({
        success: true,
        status: 200,
        data: req.params,
    })
})

app.get('/api/500', (req, res) => {
    throw Error('xxxxxxx')
})

app.listen('80', () => {
    console.log('服务器启动成功!!')
})