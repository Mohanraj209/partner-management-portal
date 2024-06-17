import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserProfile } from "../../services/UserProfileService";
import { isLangRTL } from "../../utils/AppUtils";
import backArrow from "../../svg/back_arrow.svg";
import { formatDate, moveToOidcClientsList, getStatusCode } from "../../utils/AppUtils";
import adminImage from "../../svg/admin.png";
import clientImage from "../../svg/partner.png";
import content_copy_icon from "../../svg/content_copy_icon.svg";
import content_copied_icon from "../../svg/content_copied_icon.svg";

function ViewOidcClientDetails() {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);
    const isLoginLanguageRTL = isLangRTL(getUserProfile().langCode);
    const navigate = useNavigate();
    const [oidcClientDetails, setOidcClientDetails] = useState({
        redirectUris: [],
        grantTypes: [],
    });

    useEffect(() => {
        const clientData = localStorage.getItem('selectedClientData');
        if (clientData) {
            try {
                const selectedClient = JSON.parse(clientData);
                setOidcClientDetails(selectedClient);
            } catch (error) {
                navigate('/partnermanagement/authenticationServices/oidcClientsList');
                console.error('Error in viewOidcClientDetails page :', error);
            }
        } else {
            navigate('/partnermanagement/authenticationServices/oidcClientsList');
        }
    }, [navigate]);

    const moveToHome = () => {
        navigate("/partnermanagement");
    };

    function bgOfStatus(status) {
        if (status === "approved" || status === "ACTIVE") {
            return ("bg-[#D1FADF] text-[#155E3E]")
        }
        else if (status === "rejected") {
            return ("bg-[#FAD6D1] text-[#5E1515]")
        }
        else if (status === "pendingForApproval" || status === "inProgress") {
            return ("bg-[#FEF1C6] text-[#6D1C00]")
        }
        else if (status === "deActivated" || status === "DEACTIVATED") {
            return ("bg-[#EAECF0] text-[#525252]")
        }
    };

    const copyId = () => {
        navigator.clipboard.writeText(oidcClientDetails.oidcClientId).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    const capitalization = (type) => {
        return type
            .toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    };

    return (
        <>
            <div className={`flex-col w-full p-5 bg-anti-flash-white h-full font-inter max-[450px]:text-sm mb-[2%] ${isLoginLanguageRTL ? "mr-[8%]" : "ml-[8%]"} overflow-x-scroll`}>
                <div className="flex justify-between mb-5">
                    <div className="flex items-center gap-x-2">
                        <img
                            src={backArrow}
                            alt=""
                            onClick={() => moveToOidcClientsList(navigate)}
                            className={`cursor-pointer ${isLoginLanguageRTL ? "rotate-180" : null}`}
                        />
                        <div className="flex-col">
                            <h1 className="font-bold text-lg text-md text-dark-blue">
                                {t("viewOidcClientDetails.viewOidcClientDetails")}
                            </h1>
                            <div className="flex space-x-1">
                                <p
                                    onClick={() => moveToHome()}
                                    className="font-semibold text-tory-blue text-xs cursor-pointer"
                                >
                                    {t("commons.home")} /
                                </p>
                                <p onClick={() => moveToOidcClientsList(navigate)} className="font-semibold text-tory-blue text-xs cursor-pointer">
                                    {t("viewOidcClientDetails.authenticationServiceSection")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-snow-white h-fit mt-1 rounded-t-xl shadow-lg font-inter">
                    <div className="flex justify-between px-9 pt-6 border-b-2 max-[450px]:flex-col">
                        <div className="flex-col">
                            <p className="font-bold text-2xl text-dark-blue mb-3">{oidcClientDetails.oidcClientName}</p>
                            <div className="flex items-center justify-start mb-2 max-[400px]:flex-col max-[400px]:items-start">
                                <div className={`${bgOfStatus(oidcClientDetails.status)} flex w-fit py-1 px-5 text-sm rounded-md my-2 font-semibold`}>
                                    {getStatusCode(oidcClientDetails.status, t)}
                                </div>
                                <div className={`font-medium ${isLoginLanguageRTL ? "mr-1" : "ml-3"} text-sm text-dark-blue`}>
                                    {t("viewOidcClientDetails.createdOn") + ' ' +
                                        formatDate(oidcClientDetails.crDtimes, "date")}
                                </div>
                                <div className="mx-2 text-gray-300 max-[400px]:">|</div>
                                <div className="font-medium text-sm text-dark-blue">
                                    {formatDate(oidcClientDetails.crDtimes, "time")}
                                </div>
                            </div>
                        </div>
                        <button type="button"
                            className={`bg-[#F0F5FF] border-2 h-[4%] w-[15%] max-[450px]:w-[40%] max-[800px]:w-[25%] border-[#BED3FF] ${isLoginLanguageRTL ? "pr-[3%] pl-[1.5%]" : "pl-[3%] pr-[1.5%]"} py-[0.5%] text-right rounded-md cursor-pointer hover:shadow-md`}>
                            <p className="text-sm font-medium text-[#333333]">{t('viewOidcClientDetails.oidcClientId')}</p>
                            <div className="flex space-x-1 items-center">
                                <p className={`text-md font-bold text-[#1447B2] ${copied ? "mr-6" : "mr-0"} truncate`}>
                                    {oidcClientDetails.oidcClientId}
                                </p>
                                {
                                    copied
                                        ? <img src={content_copied_icon} className={`absolute ${isLoginLanguageRTL ? "left-14" : "right-14"}  mt-[5%]`} />
                                        : <img src={content_copy_icon} onClick={() => copyId()} />
                                }
                            </div>
                        </button>
                    </div>

                    <div className={`${isLoginLanguageRTL ? "pr-8 ml-8" : "pl-8 mr-8"} pt-6 mb-4`}>
                        <div className="flex flex-wrap py-1 max-[450px]:flex-col">
                            <div className="w-[50%] mb-5">
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.partnerId")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {oidcClientDetails.partnerId}
                                </p>
                            </div>
                            <div className="mb-5 w-[50%]">
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.partnerType")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {t('Partner Type Goes Here')}
                                </p>
                            </div>
                        </div>
                        <hr className={`h-px w-full bg-gray-200 border-0`} />
                        <div className={`flex flex-wrap pt-6`}>
                            <div className={`w-[50%]`}>
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.policyGroup")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {oidcClientDetails.policyGroupName}
                                </p>
                            </div>
                            <div className={`w-[50%]`}>
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.policyName")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {oidcClientDetails.policyName}
                                </p>
                            </div>
                            <div className={`w-[50%] my-6`}>
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.policyGroupDescription")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {oidcClientDetails.policyGroupDescription}
                                </p>
                            </div>
                            <div className={`w-[50%] my-6`}>
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.policyNameDescription")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {oidcClientDetails.policyNameDescription}
                                </p>
                            </div>
                        </div>
                        <hr className="h-px w-full bg-gray-200 border-0" />
                        <div className="space-y-10">
                            <div className="my-9">
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.name")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {oidcClientDetails.oidcClientName}
                                </p>
                            </div>
                            <div className="my-6 space-y-2">
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.publicKey")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg text-wrap line-clamp-6 w-[90%]">
                                    {oidcClientDetails.publicKey}
                                </p>
                            </div>
                            <div className="my-8 space-y-1">
                                <p className="font-semibold text-suva-gray text-base">
                                    {t("viewOidcClientDetails.logoUri")}
                                </p>
                                <p className="font-semibold text-vulcan text-lg">
                                    {oidcClientDetails.logoUri}
                                </p>
                            </div>
                            <div className="flex flex-wrap my-6 max-[800px]:flex-col">
                                <div className="flex-col space-y-1 w-[50%]">
                                    <p className="font-semibold text-suva-gray text-base">
                                        {t("viewOidcClientDetails.redirectUri")}
                                    </p>
                                    <div className="flex flex-col">
                                        {(oidcClientDetails.redirectUris).map((uri, index) => {
                                            return (
                                                <ul>
                                                    <li key={index} className="space-y-4">
                                                        <p className="text-lg max-[450px]:text-sm max-[450px]:font-medium font-normal text-[#36393E] py-1">
                                                            {uri}
                                                        </p>
                                                        {(oidcClientDetails.redirectUris).length > 1 &&
                                                            (<hr className="h-px bg-gray-200 border-2" />)
                                                        }
                                                    </li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="flex-col space-y-1 w-[50%]">
                                    <p className="font-semibold text-suva-gray text-base max-[800px]:mt-4">
                                        {t("viewOidcClientDetails.grantTypes")}
                                    </p>
                                    <div className="flex flex-col">
                                        {(oidcClientDetails.grantTypes).map((type, index) => {
                                            return (
                                                <ul>
                                                    <li key={index} className="space-y-4 text-sm">
                                                        <p className="text-[#36393E] text-lg font-semibold py-1">{capitalization(type)}</p>
                                                        {(oidcClientDetails.grantTypes).length > 1 &&
                                                            (<hr className="h-px bg-gray-200" />)
                                                        }
                                                    </li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <hr className="h-px w-full bg-gray-200 border-0" />
                        <div className="py-6">
                            <p className="font-medium text-vulcan text-lg mb-4">
                                {t("viewOidcClientDetails.comments")}
                            </p>
                            <div>
                                <div className="flex font-medium w-full ">
                                    <span className={`w-8 h-8 rounded-full flex justify-center items-center ${isLoginLanguageRTL ? "ml-3" : "mr-3"} text-sm text-white lg:w-10 lg:h-10`}>
                                        <div className={`relative flex-1 after:content-['']  after:w-0.5 after:h-[4rem] after:bg-gray-200 after:inline-block after:absolute ${isLoginLanguageRTL ? "after:right-[1.2rem]" : "after:left-[1.2rem]"} after:mt-7`}></div>
                                        <img src={adminImage} alt="Example" className="" />
                                    </span>
                                    <div className="flex bg-floral-white w-full flex-col px-4 relative rounded-md">
                                        <div className={`w-0 h-0 border-t-[0.5rem] border-t-transparent border-b-[0.5rem] border-b-transparent absolute top-4 ${isLoginLanguageRTL ? "-right-[0.38rem] border-l-[7px] border-l-[#FFF9F0]" : "-left-[0.38rem] border-r-[7px] border-r-[#FFF9F0]"}`}></div>
                                        <h4 className="text-lg  text-[#031640]">
                                            {t("viewOidcClientDetails.adminComment") + " / " + t("viewOidcClientDetails.adminName")}
                                        </h4>
                                        <div className="flex-col items-center justify-start my-2">
                                            <p className="text-[#666666] text-sm ">{t('viewOidcClientDetails.commentsOfAdmin')}</p>
                                            <div className={`${bgOfStatus(oidcClientDetails.status)} flex w-fit py-1.5 px-3 text-xs rounded-md my-2`}>
                                                {oidcClientDetails.status}
                                            </div>
                                            <div>
                                                {oidcClientDetails.updDtimes && (
                                                    <div className="flex">
                                                        <div className={`font-medium ${isLoginLanguageRTL ? "mr-3" : "ml-3"} text-sm text-dark-blue`}>
                                                            {formatDate(oidcClientDetails.updDtimes, "date")}
                                                        </div>
                                                        <div className="mx-3 text-gray-300">|</div>
                                                        <div className="font-medium text-sm text-dark-blue">
                                                            {formatDate(oidcClientDetails.updDtimes, "time")}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex font-medium w-full">
                                        <span className={`w-8 h-8 rounded-full flex justify-center items-center ${isLoginLanguageRTL ? "ml-3" : "mr-3"} text-sm lg:w-10 lg:h-10`}>
                                            <img src={clientImage} alt="Example" className="" />
                                        </span>
                                        <div className="flex bg-alice-green w-full flex-col px-4 py-3 relative rounded-md">
                                            <div className={`w-0 h-0 border-t-[0.5rem] border-t-transparent border-b-[0.5rem] border-b-transparent absolute top-4 ${isLoginLanguageRTL ? "-right-[0.38rem] border-l-[#F2F5FC] border-l-[7px]" : "-left-[0.38rem] border-r-[#F2F5FC] border-r-[7px]"}`}></div>
                                            <h4 className="text-lg  text-[#031640]">
                                                {t("viewOidcClientDetails.partnersComment")}
                                            </h4>

                                            <span className="text-sm mt-3 break-all">
                                                {oidcClientDetails.partnerComments}
                                            </span>
                                            <hr className="h-px w-full bg-gray-200 border-0 my-1" />
                                            <div className="flex items-center justify-start">
                                                <div className="font-medium text-sm text-dark-blue">
                                                    {t("viewOidcClientDetails.createdOn") + ' ' +
                                                        formatDate(oidcClientDetails.crDtimes, "date")}
                                                </div>
                                                <div className="mx-3 text-gray-300">|</div>
                                                <div className="font-medium text-sm text-dark-blue">
                                                    {formatDate(oidcClientDetails.crDtimes, "time")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    <hr className="h-px w-full bg-gray-200 border-0" />
                    <div className={`flex justify-end py-5 ${isLoginLanguageRTL ? "ml-8" : "mr-8"}`}>
                        <button onClick={() => moveToOidcClientsList(navigate)}
                            className="h-11 w-[120px] text-sm p-3 py-2 text-tory-blue bg-white border border-blue-800 font-semibold rounded-md text-center">
                            {t("viewOidcClientDetails.back")}
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ViewOidcClientDetails;