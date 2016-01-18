(function() {
    var getElem = document.querySelector.bind(document),
        getEles = document.querySelectorAll.bind(document),
        _menuLen = getEles(".mod_nav li"),
        _conLen = getEles(".tabCon"),
        _linkHref = document.location.href,
        _hrefAll = getEles("a"),
        _cid = GetQueryString("cid");

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }
    indexFun = {
        //链接href +focus事件
        hrefEvent: function() {
            if (_linkHref.indexOf("focus=") > -1) {
                var _focus = _linkHref.split("focus=")[1],
                    _focusfistStr = _focus.slice(0, 1);
                //menu current status
                switch (_focusfistStr) {
                    case "1":
                        focusEvent("insurance", "insuranceCon");
                        break;
                    case "2":
                        focusEvent("bankinverst", "inverstCon");
                        break;
                    case "3":
                        focusEvent("bankloan", "bankloanCon");
                        break;
                }
            }
            if (_linkHref.indexOf("hide=") > -1) {
                var _hideEve = _linkHref.split("hide=")[1],
                    _hidefistStr = _hideEve.slice(0, 1);
                if (_hidefistStr == 0) {
                    getElem("#navMenu").style.display = "none";
                } else if (_hidefistStr == 1) {
                    getElem("#navMenu").style.display = "block";
                }
            }
            //hide menu status
            function focusEvent(currId, currCon) {
                indexFun.removeCurrent();
                indexFun.removeCon();
                getElem("#" + currId).classList.add("current");
                getElem("#" + currCon).style.display = "block";
            }
            //连接加cid

            [].forEach.call(_hrefAll, function(element, index) {
                _hrefAll[index].addEventListener("click", function(e) {
                    //  e.preventDefault();
                    var _thisHref = element.getAttribute("href");
                    _cid ? (_linkHref.indexOf("cid=") > -1 ? (element.setAttribute("href", _thisHref + (_thisHref.indexOf("?") > -1 ? ("&cid=").trim() + _cid : ("?cid=").trim() + _cid))) : "") : "";
                });
            });
        },
        tabEvent: function() {
            var _this = this;
            [].forEach.call(_menuLen, function(val, index) {
                val.addEventListener("click", function() {
                    _this.removeCon();
                    _this.removeCurrent();
                    val.classList.add("current");
                    _conLen[index].style.display = "block";
                });
            });
        },
        removeCurrent: function() {
            [].forEach.call(_menuLen, function(val, index) {
                val.classList.remove("current");
            });
        },
        removeCon: function() {
            [].forEach.call(_conLen, function(val, index) {
                //console.log(val)
                val.style.display = "none";
            });
        },
        /**
         * 加载监控JS
         */
        loadJS: function() {
            var bodyElem = document.getElementsByTagName("body")[0];
            var jsDom = document.createElement("script");
            jsDom.src = "http://script2.pingan.com/app_js/sdc/prd/sdc_wap_exec.js";
            bodyElem.appendChild(jsDom);
        },
        /**
         * 加载广告系统
         */
        loadAD: function() {

            // 初始化广告API
            var adApi = new Object();
            adApi.getAdInfo = function(json, n, key) {
                return json.data[n].atts.placeList[0][key];
            };
            adApi.getFullAd = function(json, x) {
                    var content = '<a href="' + adApi.getAdInfo(json, x, "adLink") + '" target="_blank">' + '<img src="' + adApi.getAdInfo(json, x, "adUrl") + '" width="100%" height="auto" adDesc="' + adApi.getAdInfo(json, x, "adDesc") + '" adLink="' + adApi.getAdInfo(json, x, "adLink") + '" areaId="' + adApi.getAdInfo(json, x, "areaId") + '" areaDesc="' + adApi.getAdInfo(json, x, "areaDesc") + '" adName="' + adApi.getAdInfo(json, x, "adName") + '" material_id="' + adApi.getAdInfo(json, x, "advertId") + '" title="' + adApi.getAdInfo(json, x, "title") + '" alt="' + adApi.getAdInfo(json, x, "alt") + '" /></a>';
                    return content;
                } // 调用广告系统
            ajax({
                type: "GET",
                url: "http://www.pingan.com/adms/area.json?AREAID=QY15121612070486,QY15121612080087,QY15121612082388",
                //url: "http://adms-adm.pa18.com/adms/searchAreaById.do?areaId=QY15121612070486,Y15121612080087,QY15121612082388",
                dataType: "jsonp",
                callback: "callback",
                cache: false,
                success: function(json) {
                    //console.log(json)
                    var swiperDom = getEles(".ad_swiper .swiper-slide"),
                        swiperLen = swiperDom.length,
                        jsonLen = json.data.length;
                    [].forEach.call(swiperDom, function(element, index) {
                        if (element.classList.contains('ad_ins') == true) {
                            //console.log(element)
                            element.innerHTML = adApi.getFullAd(json, 0);
                        }
                        if (element.classList.contains('ad_bank') == true) {
                            //console.log(index)
                            element.innerHTML = adApi.getFullAd(json, 1);
                        }
                        if (element.classList.contains('ad_loan') == true) {
                            // console.log(element)
                            element.innerHTML = adApi.getFullAd(json, 2);
                        }
                    });

                },
                complete: function() {},
                error: function() {
                    if (window.console) {
                        console.log("服务器繁忙，请稍后再试~ 给您带来不便请谅解 ^_^");
                    }
                }
            });
        },
        bankLC: function() {
            ajax({
                type: "GET",
                //url: "http://jkqsh-l0299:8080/PA18-WAPMALL1.29.0/queryIndexProduct.do", //本地
                url: "http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi/queryIndexProduct.do", //测试
                //url: "http://jijin.pingan.com/jijin/jijinIndexAjax.do",
                dataType: "jsonp",
                callback: "callback",
                cache: false,
                success: function(data) {
                    var self = this;
                    this.result = {};
                    var prodList = {
                        //热门基金名称 月度最牛
                        lc_fundName1: data.zn1Month.fundShortTitle,
                        //热门基金收益率
                        lc_monthRate1: data.zn1Month.monthRate,
                        //热门基金单位净值
                        lc_unitNV1: data.zn1Month.unitNV,
                        //热门基金类型
                        lc_categoryName: data.zn1Month.categoryName,
                        //热门基金风险级别
                        lc_riskLevel: data.zn1Month.riskLevel,
                        //热门基金基金代码
                        lc_riskID1: data.zn1Month.secuCode,

                        //热门基金名称 季度最牛
                        lc_fundName3: data.zn3Month.fundShortTitle,
                        //热门基金收益率
                        lc_monthRate3: data.zn3Month.monthRate,
                        //热门基金单位净值
                        lc_unitNV3: data.zn3Month.unitNV,
                        //热门基金类型
                        lc_categoryName3: data.zn3Month.categoryName,
                        //热门基金风险级别
                        lc_riskLevel3: data.zn3Month.riskLevel,
                        //热门基金基金代码
                        lc_riskID3: data.zn3Month.secuCode,


                        //银行理财-陆金所理财列表区-产品名称
                        lc_ljs_prodName: function(n) {
                            return data.lujinsuoProdList[n].productName;
                        },
                        //银行理财-陆金所理财列表区-预期年化收益率
                        lc_ljs_incomeRate: function(n) {
                            return data.lujinsuoProdList[n].productInvestDto.incomeRate;
                        },
                        //银行理财-陆金所理财列表区-起投金额
                        lc_ljs_startAmount: function(n) {
                            return data.lujinsuoProdList[n].productInvestDto.startAmount;
                        },
                        //银行理财-陆金所理财列表区-产品期限
                        lc_ljs_timeLimit: function(n) {
                            return data.lujinsuoProdList[n].productInvestDto.timeLimit;
                        },
                        //银行理财-陆金所理财列表区-产品id
                        lc_ljs_id: function(n) {
                            return data.lujinsuoProdList[n].id;
                        },

                        //银行理财-大额投资列表区-产品名称
                        lc_dae_productName: function(n) {
                            return data.investProdList[n].productName;
                        },
                        //银行理财-大额投资列表区-预期年化收益率
                        lc_dae_incomeRate: function(n) {
                            return data.investProdList[n].productInvestDto.incomeRate;
                        },
                        //银行理财-大额投资列表区-起投金额
                        lc_dae_startAmount: function(n) {
                            return data.investProdList[n].productInvestDto.startAmount;
                        },
                        //银行理财-大额投资列表区-产品期限
                        lc_dae_timeLimit: function(n) {
                            return data.investProdList[n].productInvestDto.timeLimit;
                        },
                        //银行理财-大额投资列表区-产品id
                        lc_dae_id: function(n) {
                            return data.investProdList[n].id;
                        },

                        //银行理财-银行理财列表区-产品名称
                        lc_bank_productName: function(n) {
                            return data.licaiList[n].productName;
                        },
                        //银行理财-银行理财列表区-预期年化收益率
                        lc_bank_incomeRate: function(n) {
                            return data.licaiList[n].productYield;
                        },
                        //银行理财-银行理财列表区-起投金额
                        lc_bank_startAmount: function(n) {
                            return data.licaiList[n].pMoney;
                        },
                        //银行理财-银行理财列表区-产品期限
                        lc_bank_timeLimit: function(n) {
                            return data.licaiList[n].pdateName;
                        },
                        //银行理财-银行理财列表区-产品id
                        lc_bank_id: function(n) {
                            return data.licaiList[n].productId;
                        },

                        lc_bank_unit: function(n) {
                            return data.licaiList[n].unit;
                        },
                        lc_bank_timeunit: function(n) {
                            return data.licaiList[n].timeUnit;
                        },
                        //银行理财-银行理财列表区-产品类型
                        lc_bank_productType: function(n) {
                            return data.licaiList[n].productType;
                        },
                        //银行理财-银行理财列表区-风险级别
                        lc_bank_riskLevel: function(n) {
                            return data.licaiList[n].riskLevel;
                        },

                        //银行理财-好房众筹列表区-产品名称
                        lc_house_productName: function(n) {
                            return data.hfzcList[n].productShortName;
                        },
                        //银行理财-好房众筹列表区-众筹目标
                        lc_house_incomeRate: function(n) {
                            return data.hfzcList[n].minTargetAmount;
                        },
                        //银行理财-好房众筹列表区-起投金额
                        lc_house_startAmount: function(n) {
                            return data.hfzcList[n].investTimeLimit;
                        },
                        //银行理财-好房众筹列表区-产品id
                        lc_house_id: function(n) {
                            return data.hfzcList[n].productId;
                        },
                        //银行理财-好房众筹列表区-产品期限
                        lc_house_timeLimit: function(n) {
                            return data.hfzcList[n].yieldType;
                        },
                        //银行理财-好房众筹列表区-产品状态
                        lc_house_progressStatus: function(n) {
                            return data.hfzcList[n].progressStatus;
                        },
                        //银行理财-好房众筹列表区-已筹得
                        lc_house_progress: function(n) {
                            return data.hfzcList[n].progress;
                        },
                        lc_house_unit: function(n) {
                            return data.hfzcList[n].unit;
                        },
                        appendInfo_jijin: function() {
                            var riskStr1 = null,
                                riskStr3 = null,
                                categoryName1 = prodList.lc_categoryName,
                                categoryName3 = prodList.lc_categoryName3;
                            var category_riskcategory = {
                                "股票型": "高风险",
                                "混合型": "中高风险",
                                "债券型": "中风险",
                                "货币型": "低风险",
                                null: ""
                            }
                            riskStr1 = category_riskcategory[categoryName1];
                            riskStr3 = category_riskcategory[categoryName3];
                            contents = '<a href="http://m.pingan.com/chaoshi/jijin/' + prodList.lc_riskID1 + '.shtml' + (_cid ? '?cid=' + _cid : '') + '" otitle="APP旗舰店首页-投资理财-基金-产品1" id="hotFundOneMonth">' +
                                '<div class="kind_title">' +
                                '<h3 class="nopre">' +
                                '<em class="article">' + prodList.lc_fundName1 + '</em>' +
                                '<em class="mark">月度最牛</em>' +
                                '</h3>' +
                                '<div class="kind_mark" id="fundOneMonth">' +
                                (prodList.lc_categoryName ? '<span>' + prodList.lc_categoryName + '</span>' : '<span style="display:none"></span>') +
                                (riskStr1 == null ? "" : '<span>' + riskStr1 + '</span>') +
                                '</div>' +
                                '</div>' +
                                '<ul class="kind_list hotfundDiff">' +
                                '<li>' +
                                '<p>' +
                                '<em class="pl0">' + prodList.lc_unitNV1 + '</em>' +
                                '</p>' +
                                '<p>单位净值</p>' +
                                '</li>' +
                                '<li>' +
                                '<p>' +
                                '<em class="pl0">' + prodList.lc_monthRate1 + '</em>' +
                                '</p>' +
                                '<p class="net_value">近1月涨幅</p>' +
                                '</li>' +
                                '</ul>' +
                                '</a>' +
                                '<a href="http://m.pingan.com/chaoshi/jijin/' + prodList.lc_riskID3 + '.shtml' + (_cid ? '?cid=' + _cid : '') + '" otitle="APP旗舰店首页-投资理财-基金-产品2" id="hotFundThreeMonth">' +
                                '<div class="kind_title">' +
                                '<h3 class="nopre">' +
                                '<em class="article">' + prodList.lc_fundName3 + '</em>' +
                                '<em class="mark">季度最牛</em>' +
                                '</h3>' +
                                '<div class="kind_mark" id="fundThreeMonth">' +
                                '<span>' + prodList.lc_categoryName3 + '</span>' +
                                (riskStr3 == null ? "" : '<span>' + riskStr3 + '</span>') +
                                '</div>' +
                                '</div>' +
                                '<ul class="kind_list hotfundDiff">' +
                                '<li>' +
                                '<p>' +
                                '<em class="pl0">' + prodList.lc_unitNV3 + '</em>' +
                                '</p>' +
                                '<p>单位净值</p>' +
                                '</li>' +
                                '<li>' +
                                '<p>' +
                                '<em class="pl0">' + prodList.lc_monthRate3 + '</em>' +
                                '</p>' +
                                '<p class="net_value">近3月涨幅</p>' +
                                '</li>' +
                                '</ul>' +
                                '</a>';
                            return contents;
                        },
                        appendInfo_lufax: function() {
                            var lu_conLen = data.lujinsuoProdList.length;
                            var contents = "";
                            var k = 0;
                            for (var i = 0; i < lu_conLen; i++) {
                                k = i + 1;
                                contents +=
                                    '<a href="http://m.pingan.com/chaoshi/lujinsuo/' + prodList.lc_ljs_id(i) + '.shtml' + (_cid ? "?cid=" + _cid : "") + '" otitle="APP旗舰店首页-投资理财-陆金所理财-产品' + k + '">' +
                                    '<div class="kind_title">' +
                                    '<h3 class="nopre pb0">' + prodList.lc_ljs_prodName(i) +
                                    '<span class="ico_hot">热门</span>' +
                                    '</h3>' +
                                    '<div class="lux_count">' + prodList.lc_ljs_incomeRate(i) + '</div>' +
                                    '<p class="tip">预期年化收益率</p>' +
                                    '</div>' +
                                    '<ul class="kind_list">' +
                                    '<li>' +
                                    '<p>起投金额' +
                                    '<em class="lucount">' + prodList.lc_ljs_startAmount(i) + "万" + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '<li>' +
                                    '<p>产品期限' +
                                    '<em class="lucount">' + prodList.lc_ljs_timeLimit(i) + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</a>'
                            };
                            return contents;
                        },
                        appendInfo_dae: function() {
                            var dae_conLen = data.investProdList.length;
                            var contents = "";
                            for (var i = 0; i < dae_conLen; i++) {
                                var k = i + 1;
                                contents +=
                                    '<a href="http://m.pingan.com/chaoshi/touzizhuanqu/' + prodList.lc_dae_id(i) + '.shtml' + (_cid ? "?cid=" + _cid : "") + '" otitle="APP旗舰店首页-投资理财-大额投资-产品' + k + '">' +
                                    '<div class="kind_title">' +
                                    '<h3 class="pb0">' + prodList.lc_dae_productName(i) + '</h3>' +
                                    '<div class="lux_count">' + prodList.lc_dae_incomeRate(i) + '</div>' +
                                    '<p class="tip">预期年化收益率</p>' +
                                    '</div>' +
                                    '<ul class="kind_list">' +
                                    '<li>' +
                                    '<p>起投金额' +
                                    '<em class="lucount">' + prodList.lc_dae_startAmount(i) + "万" + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '<li>' +
                                    '<p>产品期限' +
                                    '<em class="lucount">' + prodList.lc_dae_timeLimit(i) + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</a>'
                            };
                            return contents;
                        },
                        appendInfo_bank: function() {
                            var bank_conLen = data.licaiList.length;
                            var contents = "";
                            var Num_unit = null,
                                day_unit = null,
                                unit = null,
                                timeUnit = null,
                                riskLevel = null,
                                riskStr = null
                            for (var i = 0; i < bank_conLen; i++) {
                                var k = i + 1;
                                unit = prodList.lc_bank_unit(i);
                                timeUnit = prodList.lc_bank_timeunit(i);
                                riskLevel = prodList.lc_bank_riskLevel(i);
                                var riskobj = {
                                    "1": "低风险",
                                    "2": "中低风险",
                                    "3": "中风险",
                                    "4": "中高风险",
                                    "5": "高风险"
                                }
                                riskStr = riskobj[riskLevel]
                                var unitNum = {
                                    "1": "元",
                                    "1000": "千",
                                    "10000": "万"
                                }
                                Num_unit = unitNum[unit];
                                var unittime = {
                                    1: "天",
                                    30: "月",
                                    365: "年"
                                }
                                day_unit = unittime[timeUnit];
                                contents +=
                                    '<a href="http://m.pingan.com/chaoshi/licai/' + prodList.lc_bank_id(i) + '.shtml' + (_cid ? "?cid=" + _cid : "") + '" otitle="APP旗舰店首页-投资理财-银行理财-产品' + k + '">' +
                                    '<div class="kind_title bank_diff">' +
                                    '<h3>' + prodList.lc_bank_productName(i) + '</h3>' +
                                    '<div class="kind_mark ">' +
                                    (prodList.lc_bank_productType(i) ? '<span>' + prodList.lc_bank_productType(i) + '</span>' : '<span style="display:none"></span>') +
                                    '<span>' + riskStr + '</span>' +
                                    '</div>' +
                                    '<div class="lux_count">' + prodList.lc_bank_incomeRate(i) + '</div>' +
                                    '<p class="tip">预期年化收益率</p>' +
                                    '</div>' +
                                    '<ul class="kind_list">' +
                                    '<li>' +
                                    '<p>起投金额' +
                                    '<em class="lucount">' + prodList.lc_bank_startAmount(i) + Num_unit + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '<li>' +
                                    '<p>产品期限' +
                                    '<em class="lucount">' + prodList.lc_bank_timeLimit(i) + day_unit + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</a>'
                            };
                            return contents;
                        },
                        appendInfo_house: function() {
                            var house_conLen = data.hfzcList.length;
                            var contents = "";
                            var Num_unit = null; //单位
                            var thisProgress = null //状态
                            var progressStateDom = null; //状态文案
                            for (var i = 0; i < house_conLen; i++) {
                                var k = i + 1;
                                var thisProgress = prodList.lc_house_progressStatus(i);
                                var DateTime = prodList.lc_house_timeLimit(i);
                                var statuspercentage = prodList.lc_house_progress(i);
                                var progressCountObj = {
                                    1: "100%",
                                    3: DateTime + "天",
                                    4: statuspercentage + "%"
                                }
                                progressCount = progressCountObj[thisProgress]

                                var progressStatus = {
                                    1: "已筹得",
                                    3: "距开放认筹",
                                    4: "已筹得"
                                }
                                progressStateDom = progressStatus[thisProgress]

                                unit = prodList.lc_house_unit(i);
                                unitNum = {
                                    "1": "元",
                                    "1000": "千",
                                    "10000": "万"
                                }
                                Num_unit = unitNum[unit];
                                contents +=
                                    '<a href="http://m.pingan.com/chaoshi/fangzc/' + prodList.lc_house_id(i) + '.shtml' + (_cid ? "?cid=" + _cid : "") + '" otitle="APP旗舰店首页-投资理财-好房众筹-产品' + k + '">' +
                                    '<div class="kind_title">' +
                                    '<h3 class="pb0">' + prodList.lc_house_productName(i) + '</h3>' +
                                    '<div class="lux_count">' + prodList.lc_house_incomeRate(i) + "万" + '</div>' +
                                    '<p class="tip">众筹目标</p>' +
                                    '</div>' +
                                    '<ul class="kind_list">' +
                                    '<li>' +
                                    '<p>持有时间' +
                                    '<em class="lucount">' + prodList.lc_house_startAmount(i) + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '<li>' +
                                    '<p>' + progressStateDom +
                                    '<em class="lucount">' + progressCount + '</em>' +
                                    '</p>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</a>'
                            };
                            return contents;
                        },
                        // riskLevel: function() {
                        //     ////////////////
                        //     function hotFundFun(fundLinkStr, fundRiskDom) {
                        //         var fundString = getElem(fundLinkStr).getAttribute("href");
                        //         if (fundString) {
                        //             var fundCodeStr = fundString.split("http://m.pingan.com/chaoshi/jijin/");
                        //             var fundCodeNum = fundCodeStr[1].split(".shtml");
                        //             var fundCodeNumber = fundCodeNum[0];
                        //             ajax({
                        //                 type: "GET",
                        //                 url: "http://jijin.pingan.com/jijin/interface.do?m=grf&fundCode=" + fundCodeNumber,
                        //                 dataType: "jsonp",
                        //                 callback: "callback",
                        //                 cache: false,
                        //                 success: function(riskdata) {
                        //                     var riskLevel = riskdata.risk;
                        //                     var riskobj = {
                        //                         "1": "低风险",
                        //                         "2": "中低风险",
                        //                         "3": "中风险",
                        //                         "4": "中高风险",
                        //                         "5": "高风险"
                        //                     }
                        //                     riskStr = riskobj[riskLevel];
                        //                     var risknode = document.createElement("span");
                        //                     var textnode = document.createTextNode(riskStr);
                        //                     risknode.appendChild(textnode);
                        //                     getElem(fundRiskDom).appendChild(risknode);
                        //                 },
                        //                 error: function() {
                        //                     alert("服务器繁忙：请刷新页面或稍后再试，给您带来不便请谅解 :\)");
                        //                 }
                        //             })
                        //         }
                        //     }
                        //     hotFundFun("#hotFundOneMonth", "#fundOneMonth");
                        //     hotFundFun("#hotFundThreeMonth", "#fundThreeMonth");
                        // }
                    };
                    getElem("#hotFundList").innerHTML = prodList.appendInfo_jijin();
                    getElem("#lufaxList").innerHTML = prodList.appendInfo_lufax();
                    getElem("#daeList").innerHTML = prodList.appendInfo_dae();
                    getElem("#banklcList").innerHTML = prodList.appendInfo_bank();
                    getElem("#houselcList").innerHTML = prodList.appendInfo_house();
                    //prodList.riskLevel();
                },
                error: function() {
                    alert("服务器繁忙：请刷新页面或稍后再试，给您带来不便请谅解 :\)");
                }
            })
        },
        init: function() {
            this.tabEvent();
            this.loadAD();
            this.loadJS();
            this.hrefEvent();
            this.bankLC();
        }
    }
    indexFun.init();


    //初始化轮播控件
    var $bullets = getEles(".point li"),
        bulletsLen = $bullets.length,
        swiperLen = getEles(".ad-swiper li").length;

    new Swiper('#slider', {
        loop: true,
        pagination: '.swiper-pagination',
        autoplay: 5000,
        autoplayDisableOnInteraction: false
    });
})()