/**
 * Netcraft webapp main JS file
 */

var tabNames = ['#quick-reports', '#fmy-folders', '#my-team-folders', '#public-folders'];

function initData ()
{
	UTILS.ajax("data/config.json", {done: loadPageData});
}

function loadPageData(data){
    updateNotification(data.notification);
}

function updateNotification(data){
    $(".notifications").classList.add('hidden');
    if(data != undefined && data!=""){
        $(".notifications").innerHTML = data;
        $(".notifications").classList.remove('hidden');
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
window.onLoad = initData();
/**
 * Function to be prefromed after the document is ready
 */
$(document).ready(function()
{
	document.location.hash = '#quick-reports';
	UTILS.addEvent(window, "hashchange", setActiveTab);
});