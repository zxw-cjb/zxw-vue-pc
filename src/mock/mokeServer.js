import Mock from 'mockjs';
import banners from './rbanners.json'
import floors from './rfloors'



Mock.mock("/mock/banners", "get", {
    code: 200,
    "data|4": banners
})

Mock.mock("/mock/floors", "get", {
    code: 200,
    "data|2": floors
})