/**
 * Netcraft webapp main JS file
 */

var tabNames = ['#quick-reports', '#fmy-folders', '#my-team-folders', '#public-folders'];
var data = {
	"notification": "The data of UTF BI would be updated at 16:00 pm.",
	"quickActions": [
		{
			"label": "Select<br>Reporting Platform",
			"icon": "action-report-new",
			"actionsLabel": "Choose QS report",
			"actions": [
				{
					"label": "Corporate",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Simple",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Business",
					"url": "http://netcraft.co.il"
				}
			]
		}, {
			"label": "Select<br>Dashboard",
			"icon": "action-report-top",
			"actionsLabel": "Choose Dashboard",
			"actions": [
				{
					"label": "Account Dashboard",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Daily Huddle Dashboard",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Tier 2 Dashboard",
					"url": "http://netcraft.co.il"
				}, {
					"label": "ADM Dashboard",
					"url": "http://netcraft.co.il"
				}
			]
		}, {
			"label": "Help &amp;<br>Tutorials",
			"icon": "actions-help",
			"actionsLabel": "Choose guide",
			"actions": [
				{
					"label": "Real Time",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Past Data",
					"url": "http://netcraft.co.il"
				}, {
					"label": "Corporate Data",
					"url": "http://netcraft.co.il"
				}
			]
		}
	],
	"tabsList": [
		{
			"options": {
				"rowLabel": "Report"
			}
		}, {
			"options": {
				"url": "http://www.paulirish.com/"
			}
		}, {
			"options": {
				"rowLabel": "Folder"
			}
		}, {
			"options": {
				"url": "http://addyosmani.com/"
			}
		}
	]
};

/*function initData () todo
{
	UTILS.ajax("data/config.json", {done: loadPageData});
}*/

function loadPageData(data){
    updateNotification(data.notification);
    updateNavSection(data.quickActions);
    updateStaticTabs(data.tabsList);
}

function updateNotification(data){
    $(".notifications").addClass('hidden');
    if(data != undefined && data!="")
    {
        $(".notifications").append(data);
        $(".notifications").removeClass('hidden');
    }
}
function updateNavSection(data)
{
	if(data != undefined && data!="")
	{
		for (var j=0;j<data.length;j++)
		{
			/* add title */
			$(".nav-section:nth-of-type("+(j+1)+")").prepend('<p>'+data[j].label+'</p>');
			/* add icon */
			$(".nav-section:nth-of-type("+(j+1)+")").children('.cropHight').append('<img class="scale" src="Images/icons/'+data[j].icon+'.png" alt"page icon">')
			/* add action label */
			$(".nav-section:nth-of-type("+(j+1)+")").find('.menu-hint').prepend('<p>'+data[j].actionsLabel+'</p>');
			/* add action list */
			for (var i=0;i<data[j].actions.length; i++)
			{
				$(".nav-section:nth-of-type("+(j+1)+")").find('.action-list').append(
					'<li><a href="'+data[j].actions[i].url+'" target="_blank">'+data[j].actions[i].label+'</a></li>');
			}
		}
	}
}

function updateStaticTabs(data)
{
	if(data != undefined && data!="")
	{
		$('#fmy-folders > iframe').attr('src',data[1].options.url);
		$('#public-folders > iframe').attr('src',data[3].options.url);
	}
}
/** 
 * load the correct tab upon click on a link:
 * see UTILS.addEvent(window, "hashchange", setActiveTab); for function call
 */
function setActiveTab ()
{
	$('#tabList > li').removeClass('activeTab');
	var hash = location.hash;
	$('a[href="'+hash+'"]').parent().addClass('activeTab');
	/* hide all tabs and show the "correct" one */
	$.each(tabNames, function (index, value)
	{
		$(value).addClass('hidden');
	});
	$($('a[href="'+hash+'"]').attr('href')).removeClass('hidden');
}

/**
 * open iframe in new window
 */
function newWindow ()
{
	var iframeAddress = $(this).parent().siblings('iframe').attr('src');
	window.open(iframeAddress,'_blank');
}
$(document).on('click','.expand-icon',newWindow);


/* load data */
//window.onLoad = initData(); todo
/**
 * Function to be prefromed after the document is ready
 */
$(document).ready(function()
{
	document.location.hash = '#quick-reports';
	UTILS.addEvent(window, "hashchange", setActiveTab);
	loadPageData(data); // todo
});