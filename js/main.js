/**
 * Netcraft webapp main JS file
 */

var tabNames = ['#quick-reports', '#fmy-folders', '#my-team-folders', '#public-folders'];

/* load the correct tab upon webpage load */
function initActiveTab ()
{
	/* get the hash addresss from the url */
	var winLocation = window.location.href;
	var activeTab = '#'+winLocation.split('#')[1];
	if ((tabNames.indexOf(activeTab) == -1) || (activeTab==undefined) )
	{
		$('#tabList a[href="#quick-reports"]').trigger('click');
	}
	else
	{
		$('#tabList a[href="'+activeTab+'"]').trigger('click');
	}
}

/** 
 * load the correct tab upon click on a link:
 * see $(document).on('click','#tabList a',setActiveTab) for call fir function
 */
function setActiveTab ()
{
	$('#tabList > li').removeClass('activeTab');
	$(this).parent().addClass('activeTab');
	/* hide all tabs and show the "correct" one */
	$.each(tabNames, function (index, value)
	{
		$(value).addClass('hidden');
	});
	$($(this).attr('href')).removeClass('hidden');
}

/**
 * open iframe in new window
 */
function newWindow ()
{
	var iframeAddress = $(this).parent().siblings('iframe').attr('src');
	window.open(iframeAddress,'_blank');
}

$(document).on('click','#tabList a',setActiveTab);
$(document).on('click','.expand-icon',newWindow);

/**
 * Function to be prefromed after the document is ready
 */
$(document).ready(function()
{
	initActiveTab();
});