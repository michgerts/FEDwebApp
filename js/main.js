/**
 * Netcraft webapp main JS file
 */

var tabNames = ['#quick-reports', '#fmy-folders', '#my-team-folders', '#public-folders'];
/* local data */
/*var data = {
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
};*/


function initData ()
{
	UTILS.ajax("data/config.json", {done: loadPageData});
}

function loadPageData(data)
{
    updateNotification(data.notification);
    updateNavSection(data.quickActions);
    updateStaticTabs(data.tabsList);
}

function updateNotification(data){
    $(".notifications").addClass('hidden');
    if(data != undefined && data!="")
    {
        $(".notifications").empty();
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
	window.scrollTo(0,0);
}

/**
 * open iframe in new window
 */
function newWindow ()
{
	var iframeAddress = $(this).parent().siblings('iframe').attr('src');
	window.open(iframeAddress,'_blank');
}

function toggleSettings()
{
	var settingsArea = $(this).parent().siblings('.settings');
	settingsArea.find('.invalid').removeClass('invalid');
	if (settingsArea.hasClass('hidden'))
	{
		settingsArea.removeClass('hidden');
	}
	else
	{
		settingsArea.addClass('hidden');
	}
	
}

function cancelSettings ()
{
	var settingsArea = $(this).closest('.settings');
	settingsArea.find('input').val('');
	settingsArea.addClass('hidden');
}

function saveSettings()
{
	var form = $(this).closest('.report-form');
	/* remove invalideties and tool tip */
	form.find('.invalid').removeClass('invalid');
	form.find('.has-tip').removeAttr('title');
	form.find('.has-tip').removeAttr('data-tooltip');
	form.find('.has-tip').removeClass('has-tip');
	/* validate */
	var valid = validateForm(form);
	/* update the drop list */
	if (valid)
	{
		var select = $(this).closest('.settings').parent().find('select');
		select.find('option').remove();
		updateDropList(select, form);
		select.find('option:nth-of-type(1)').attr('selected','selected');
		select.change();
	}
}

function validateForm (form)
{
	var err = [];
	for (var j=0;j<3;j++)
	{
		var fieldset = form.find("fieldset:nth-of-type("+(j+1)+")");
		var name = fieldset.find('input:nth-of-type(1)');
		var url = fieldset.find('input:nth-of-type(2)');
		var msg = '';
		/* there is a name and no url or the url missmatches */
		if (name.val().trim()!="")
		{
			var httpRegEx = "^(http|https)\:\/\/[^\/]+\/*$";
			var NOhttpRegEx = "^[a-zA-Z][^\/]*\.co\/*";
			if (url.val().trim().search(NOhttpRegEx)!=-1)
			{
				url.val('http://'+url.val().trim());
			}
			else if (url.val().trim().search(httpRegEx)!=-1)
			{
				/* the url is valid */
			}
			else
			{
				msg = 'Please enter a valid URL';
				url.addClass('invalid');
				if (url.val().trim()=="")
				{
					msg = 'Please enter a URL to match the name';
				}
				err.push(msg);
			}
		}
		/* there is a url and no name*/
		if (url.val().trim()!="" && (name.val().trim()==""))
		{
			name.addClass('invalid');
			msg = 'Please enter a name to match the URL'
			err.push(msg);
		}
	}
	if (form.find('.invalid')[0]!=undefined)
	{
		var firstInvalid = $('#'+form.find('.invalid')[0].id);
		firstInvalid.attr('data-tooltip','');
		firstInvalid.attr('title',err[0]);
		firstInvalid.addClass('has-tip');
		firstInvalid.focus();
	}
	else
	{
		var settingsArea = $(form).closest('.settings');
		settingsArea.addClass('hidden');
		return true;
	}

}

function updateDropList(select, form)
{
	for (var j=0;j<3;j++)
	{
		var fieldset = form.find("fieldset:nth-of-type("+(j+1)+")");
		var name = fieldset.find('input:nth-of-type(1)');
		var url = fieldset.find('input:nth-of-type(2)');
		if (name.val().trim()!="")
		{
			select.append('<option value="'+url.val()+'">'+name.val()+'</option>');
		}
	}
}

function changeIframe ()
{
	var link = $(this).find(':selected');
	var iFrame = $(this).parent().parent().find('iframe');
	iFrame.attr('src',link.val());
}

function serchReports (form)
{
	var searchString = $(form).find('input').val()
	reportArray = $('select option').contents();
	if (reportArray.length==0)
	{
		var msg = "The searched report "+searchString+" was not found."
		updateNotification(msg);
	}
	else
	{
		var optionsList = $('option');
		var option;
		var found = false;
		var select;
		optionsList.each(function()
		{
			if (($(this).text()==searchString) && (!found))
			{
				option=$(this);
				select = option.parent();
				option.attr('selected','selected');
				found = true;
			}
		});
		if (option==undefined)
		{
			var msg = "The searched report "+searchString+" was not found."
			updateNotification(msg);
		}
		else
		{
			var id = option.parent().parent().parent().attr('id');
			document.location.hash = '#'+id;
			select.change();
		}
	}
	$(form).find('input').val("");
}

$(document).on('click','.expand-icon',newWindow);
$(document).on('click','.options-icon',toggleSettings);
$(document).on('click','.btn-cancel',cancelSettings);
$(document).on('click','.btn-save',saveSettings);
$(document).on('change','select',changeIframe);

/* load data */
window.onLoad = initData();
/**
 * Function to be prefromed after the document is ready
 */
$(document).ready(function()
{
	UTILS.addEvent(window, "hashchange", setActiveTab);
	document.location.hash = '#quick-reports';
	/*loadPageData(data); local data*/
	/* don't reload the page */
	$('.search-box').on('submit',function (e)
	{
		e.preventDefault();
		serchReports(this);
	});
});