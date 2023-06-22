package io.mosip.test.pmptest.testcase;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
// Generated by Selenium IDE
//import org.junit.Test;
//import org.junit.Before;
//import org.junit.After;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import io.mosip.test.pmptest.utility.BaseClass;
import io.mosip.test.pmptest.utility.Commons;
import io.mosip.test.pmptest.utility.JsonUtil;
import io.mosip.test.pmptest.utility.RealTimeReport;
import org.testng.annotations.Listeners;

@Listeners(RealTimeReport.class)
public class AdminFtmDetailsTest extends BaseClass {
	private static final org.slf4j.Logger logger= org.slf4j.LoggerFactory.getLogger(AdminFtmDetailsTest.class);
	
	@Test(groups = {"FD"},dataProvider = "data-provider-FTM",dependsOnGroups = "RFTM")
	public void adminFtmDetailsTest(String cer) throws InterruptedException {
		
		Commons.click(driver, By.xpath("//a[@href='#/pmp/resources/ftmdetails/view']"));

	
		String dropdwnVal=cer.substring(0, cer.indexOf("_", 0));
		String orgName=cer.substring(0, cer.length()-4);
		
	
		Commons.filter(driver, By.id("make"),By.id("partnerOrganizationName"), data,orgName);
		Commons.click(driver, By.id("ellipsis-button0"));
		Commons.click(driver, By.id("Edit0"));
		Commons.enter(driver, By.id("model"), data + 1);
		Commons.click(driver, By.xpath("//button[@id='createButton']"));
		Commons.click(driver, By.xpath("//button[@id='confirmmessagepopup']"));

		Commons.filter(driver, By.id("make"),By.id("partnerOrganizationName"), data,orgName);
		
		Commons.click(driver, By.id("ellipsis-button0"));
		
		Commons.click(driver, By.id("Upload Certificate0"));
	
		
		Commons.uploadPartnerCert(driver,By.id("partnerDomain"),dropdwnVal,"\\ftm_cert\\",cer);

		Commons.filter(driver, By.id("make"),By.id("partnerOrganizationName"), data,orgName);

		Commons.click(driver, By.id("ellipsis-button0"));

		Commons.click(driver, By.id("View Certificate0"));

		String cert=Commons.getText(driver,By.xpath("//p"));
		logger.info(cert);
		Commons.click(driver, By.id("confirmmessagepopup"));		
	

		Commons.filter(driver, By.id("make"),By.id("partnerOrganizationName"), data,orgName);

		Commons.click(driver, By.id("ellipsis-button0"));
		Commons.click(driver, By.id("Activate0"));
		
		Commons.click(driver, By.xpath("//button[@id='confirmpopup']"));
		Commons.click(driver, By.xpath("//button[@id='confirmmessagepopup']"));
		

		Commons.filter(driver, By.id("make"),By.id("partnerOrganizationName"), data,orgName);

		Commons.click(driver, By.id("ellipsis-button0"));
		Commons.click(driver, By.id("Deactivate0"));
		
		Commons.click(driver, By.xpath("//button[@id='confirmpopup']"));
		Commons.click(driver, By.xpath("//button[@id='confirmmessagepopup']"));
		

	}
}