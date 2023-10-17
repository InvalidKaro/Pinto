let count=0
let overallCount=0
let instanceCount=1
let initial=true
let totalCount=368
let botStats=[]
function timeSince(date){const seconds=Math.floor((new Date()-date)/1000);let interval=seconds/31536000;if(interval>1){return Math.floor(interval)+" years";}
interval=seconds/2592000;if(interval>1){return Math.floor(interval)+" months";}
interval=seconds/86400;if(interval>1){return Math.floor(interval)+" days";}
interval=seconds/3600;if(interval>1){return Math.floor(interval)+" hours";}
interval=seconds/60;if(interval>1){return Math.floor(interval)+" minutes";}
return Math.floor(seconds)+" seconds";}
const container=document.getElementById("instance-container-wrapper")
const statusBar=document.getElementById("status-top-bar")
let markup=""
function getInstance(shard){if(botStats[0]==null)location.reload()
statusBar.innerHTML=`<h1>VoiceMaster Status Page</h1>
                       <h2>Total server count: ${botStats[0]["total_guild_count"]}</h2>
                       <br>
                       <h2>Last checked: ${timeSince(botStats[0]["last_checked"])} ago</h2>`
if(initial){markup+=`<div class="instance-box">
                        <div class="instance-card">
                            <h3>Instance #${shard.instance_id} (${shard.instance_guild_count})</h3>`
initial=false}
if(count===8){instanceCount++
count=0
markup+=`</div></div>`
markup+=`<div class="instance-box">
                        <div class="instance-card">
                            <h3>Instance #${shard.instance_id} (${shard.instance_guild_count})</h3>`}
let ping
if((new Date()-new Date(shard.shard_timestamp))>600000)shard.shard_ping=0
if(shard.shard_ping===0)ping="offline"
else if(shard.shard_ping<=200)ping="low"
else if(shard.shard_ping<500)ping="medium"
else if(shard.shard_ping>=500)ping="high"
markup+=`<div class="shard-card ${ping}">
                                <span><strong>#${shard.shard_id}</strong></span><span class="ping"><br>${shard.shard_ping}ms</span>
                            </div>`
count++
overallCount++
if(overallCount===totalCount)container.innerHTML=markup}
fetch("../data/Bot_Info.json").then(botResponse=>botResponse.json()).then(botJson=>botJson.forEach(botData=>botStats.push(botData)))
fetch("../data/Shard_Info.json").then(response=>response.json()).then(json=>json.forEach(data=>getInstance(data)))