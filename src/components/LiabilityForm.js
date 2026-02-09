import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useForm, Controller } from "react-hook-form";


const LiabilityForm = ({ onSubmit, playerInfo, eventInfo, mandal }) => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      signedBy: "",
    },
  });
// eslint-disable-next-line
  const { center, eventDate, location } = eventInfo;
  const {
    firstName,
    lastName,
    address,
    city,
    state,
    postalCode,
    mobileNumber,
    minor,
  } = playerInfo;

  // console.log("playerInfo", playerInfo);

  const signedBy = watch("signedBy");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const isNameFilled = signedBy && signedBy.trim() !== "";

  const regularLiabilityText = (
    <>
      <p>
        <strong>Read & Sign the BAPS CHARITIES Liability Form Below*</strong>
      </p>
      <p>
        <strong>
          Warning: By Signing This Document You Will Waive Certain Legal Rights,
          Including The Right To Sue - Please Read Carefully
        </strong>
      </p>
      <p>
        To: BOCHASANWASI SHREE AKSHAR PURUSHOTTAM SWAMINARAYAN SANSTHA CHARITIES
        INC. (hereinafter referred to as "BAPS CHARITIES")
      </p>
      <p>
        In consideration to participate in the Amrut Cup 2025 Volleyball
        Tournament schedule on {eventDate} (hereinafter referred to as "the Event") at {location}, I on behalf of
        myself, my executors, personal representatives, heirs, next of kin, and
        assigns, freely and voluntarily execute this document under the following
        terms:
      </p>
      <p>
        <strong>ASSUMPTION OF RISKS</strong>
      </p>
      <p>
        I acknowledge, agree and represent that:
      </p>
      <p>
        I know and understand the risks associated with participating in the
        Event, including the following: Encounter any kind of physical injury at
        the Event and sickness from eating food that they may be allergic to. I
        freely accept and fully assume all such risks, dangers and hazards and
        the possibility of personal injury, harm, death, property damage or
        loss, resulting therefrom, and responsibility for losses, costs and
        damages, however caused, that I incur as a result of the participation
        in the Event.
      </p>
      <p>
        <strong>RELEASE OF LIABILITY, WAIVER OF CLAIMS AND INDEMNITY AGREEMENT</strong>
      </p>
      <p>
        I hereby agree:
      </p>
      <p>
        To waive any and all claims that I have or may in the future have against
        BAPS CHARITIES, their affiliated organizations in Canada and in other
        nations, its directors, officers, employees, volunteers, and members (all
        of whom are hereinafter collectively referred to as "the Releasees") and
        their respective successors and assigns;
      </p>
      <p>
        To release the Releasees and their respective successors and assigns from
        all liability or responsibility whatsoever for any loss, damage, injury,
        death or expense that I may suffer, as a result of participation in the
        Event, however caused, including, but not limited to negligence of the
        Releasees, breach of contract, and breach of any statutory or other duty
        of care.
      </p>
      <p>
        To the fullest extent permitted by law, to personally, defend, indemnify
        and hold harmless the Releasees against any and all liability, claims,
        actions, causes of action and demands, including all costs and legal fees
        connected therewith, and for any damages which may be asserted, claimed
        or recovered against or from the Releasees, by reason of personal injury,
        including bodily injury or death and/or property damage, which arises out
        of or is in any way connected or associated with the participation in the
        Event.
      </p>
      <p>
        That I am not only giving up the right to sue the Releasees on our own
        behalf(ves), but also any rights of our respective heirs, next of kin,
        executors, personal representatives and assigns may have to sue resulting
        from the injury or death.
      </p>
      <p>
        To grant and convey unto BAPS CHARITIES all right, title and interest in
        any and all photographic images and video or audio recordings made by the
        Releasees during the Event, including, but not limited to, any royalties,
        proceeds, or other benefits derived from such photographs or recordings.
        I also waive any and all rights, including moral rights, I have in the
        photographic images and video or audio recordings made by any of the
        Releasees, its assignees and licensees. I understand and agree that the
        Releasees may use, modify and/or publish the photographic images and
        video or audio recordings or portions thereof in any manner it considers
        appropriate;
      </p>
      <p>
        In entering into this Agreement, I am not relying upon any oral or
        written representations or statements made by the Releasees other than
        what is set forth in this Agreement.
      </p>
      <p>
        <strong>
          I have read the above waiver of claims and release of liability
          document *
        </strong>
      </p>

    </>
  );


  const minorLiabilityText = (
    <>
      <p>
        BOCHASANWASI SHRI AKSHAR PURUSHOTTAM SWAMINARAYAN SANSTHA INC:
        ASSUMPTION OF RISKS, RELEASE OF LIABILITY, WAIVER OF CLAIMS AND
        INDEMNITY AGREEMENT : {firstName} {lastName}
      </p>
      <p>
       In consideration to participate in the Amrut Cup 2025 Volleyball Tournament
       (hereinafter referred to as "the Event"), I on behalf of myself, my executors,
       personal representatives, heirs, next of kin, and assigns, freely and voluntarily
       execute this document under the following terms:
      </p>
      <p>
        <b>ASSUMPTION OF RISKS</b>
        <h3>I/We acknowledge, agree and represent that:</h3>
      </p>
      <p>
        I/We know and understand the risks associated with participating with
        the Minor participating in the Event, including the following: Encounter
        any kind of physical injury at the Event and sickness from eating food
        that they may be allergic to. I/We freely accept and fully assume all
        such risks, dangers and hazards and the possibility of personal injury,
        harm, death, property damage or loss, resulting therefrom, and
        responsibility for losses, costs and damages, however caused, that I/We
        incur as a result of the participation in the Event.
      </p>
      <p>
        <b>RELEASE OF LIABILITY, WAIVER OF CLAIMS AND INDEMNITY AGREEMENT</b>
        <h1>I/We hereby agree:</h1>
      </p>
      <p>
        I/We hereby agree to waive any and all claims that I/We and the Minor
        have or may in the future have against BAPS Inc, their affiliated
        organizations in Canada and in other nations, its directors, officers,
        employees, volunteers, and members (all of whom are hereinafter
        collectively referred to as “the Releasees”) and their respective
        successors and assigns.
      </p>
      <p>
        To release the Releasees and their respective successors and assigns
        from all liability or responsibility whatsoever for any loss, damage,
        injury, death, or expense that I/We and the minor may suffer, as a
        result of participation in the Event, however caused, including, but not
        limited to negligence of the Releasees, breach of contract, and breach
        of any statutory or other duty of care.
      </p>
      <p>
        To the fullest extent permitted by law, to personally, defend, To the
        fullest extent permitted by law, to personally and not solely on behalf
        of the minor, defend, indemnify and hold harmless the Releasees against
        any and liability, claims, actions, causes of action and demands,
        including all costs and legal fees connected therewith, and for any
        damages which may be asserted, claimed or recovered against or from the
        Releasees, by reason of personal injury, including bodily injury or
        death and/or property damage, which arises out of or is in any way
        connected or associated with the Minor’s participation in the Event.
      </p>
      <p>
        That I/We am not only giving up the right to sue the Releasees on our
        own behalf(ves) of the Minor, but also any rights of our respective
        heirs, next of kin, executors, personal representatives and assigns may
        have to sue resulting from the injury or death of the Minor.
      </p>
      <p>
        To grant and convey unto BAPS Inc all right, title and interest in any
        and all photographic images and video or audio recordings made by the
        Releasees during the Event, including, but not limited to, any
        royalties, proceeds, or other benefits derived from such photographs or
        recordings. I/we also waive any and all rights, including moral rights;
        I/We have in the photographic images and video or audio recordings made
        by any of the Releasees, its assignees and licensees. I/we understand
        and agree that the Releasees may use, modify and/or publish the
        photographic images and video or audio recordings or portions thereof in
        any manner it considers appropriate.
      </p>
      <p>
        In entering into this Agreement, I/we and the Minor am not relying upon
        any oral or written representations or statements made by the Releasees
        other than what is set forth in this Agreement.
      </p>
      <p>
        <b>
          I/We and the Minor have read and understand this agreement and am
          aware that by signing this agreement I/We am waiving certain legal
          rights which I/We or my heirs, next of kin, executors, personal
          representatives and assigns may have against the Releasees.
        </b>
      </p>
      <p>
        I/We understand that if I/We and the Minor have any questions regarding
        this Agreement, I/We should consult a lawyer prior to executing the
        Agreement.
      </p>
    </>
  );

  const generateLiabilityHTMLText = (input) => {
    return ReactDOMServer.renderToStaticMarkup(input);
  };

  const onFormSubmit = (data) => {
    if (isNameFilled) {
      const signedBy = data.signedBy.trim().toLowerCase();
      const firstNameLower = firstName.trim().toLowerCase();
      const lastNameLower = lastName.trim().toLowerCase();
      const fullNameLower = `${firstNameLower} ${lastNameLower}`;

      if ( signedBy !== fullNameLower) {
        setError("signedBy", {
          type: "manual",
          message:
            "Signature must be same as your full name (first name <space> last name)",
        });
        return;
      }

      setIsFormSubmitted(true); // Mark the form as submitted
      const liabilityData = {
        signature: data.signedBy,
        address: `${address}${city ? ", " + city : ""}${
          state ? ", " + state : ""
        }${postalCode ? " " + postalCode : ""}`,
        telephone: mobileNumber,
        liabilityText: generateLiabilityHTMLText(regularLiabilityText),
      };
      onSubmit(liabilityData);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg max-w-4xl mx-auto">
      <h3 className="text-lg underline font-bold text-gray-900 mb-4 ">
        ASSUMPTION OF RISKS, RELEASE OF LIABILITY, WAIVER OF CLAIMS AND
        INDEMNITY AGREEMENT
      </h3>

      <div className="agreement-text text-justify">
        <span className="text-left leading-relaxed text-gray-800">
          {/* Render the liability text dynamically */}
          {minor === "yes" ? minorLiabilityText : regularLiabilityText}
          {/* {regularLiabilityText} */}
        </span>
      </div>

      <div id="signatureError" className="text-red-500 text-sm mt-1"></div>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-2">
          <label className="block font-semibold mb-2 mt-2">
            Signature <span className="text-red-500">*</span>
            <div className="font-normal text-sm mt-1">
              {playerInfo.minor === "yes" ? (
                <p>
                  <span className="font-bold">Under 18 Years:</span> Please have
                  your parents type their full name below to electronically sign
                  and agree the above liability form.
                </p>
              ) : (
                <p>
                  <span className="font-bold">18 Years or Older:</span> Please
                  type your full name below to electronically sign and agree the above
                  liability form.
                </p>
              )}
            </div>
          </label>

          <Controller
            name="signedBy"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                placeholder="Sign Here By Typing Your Full Name"
                {...field}
                className="border rounded-lg p-2 w-full"
                readOnly={isFormSubmitted} // Make input readonly if form is submitted
              />
            )}
          />
        </div>
        {errors.signedBy && (
          <p className="text-red-500 text-sm mt-1">{errors.signedBy.message}</p>
        )}

        {/* Add the address line here */}
        <div className="mb-0 text-sm text-gray-600">
          {(address || city || state || postalCode) && (
            <>
              Street Address:
              {[
                address,
                city && address ? `, ${city}` : city,
                state && (address || city) ? `, ${state}` : state,
                postalCode && (address || city || state)
                  ? ` ${postalCode}`
                  : postalCode,
              ]
                .filter(Boolean)
                .join("")}
            </>
          )}
        </div>
        <div className="mb-4 text-sm text-gray-600">
          {mobileNumber && mobileNumber.trim() !== "" && (
            <>Telephone: {mobileNumber}</>
          )}
        </div>

        <button
          type="submit"
          className={`px-4 py-2 rounded-lg transition w-full
                      ${
                        isFormSubmitted
                          ? "bg-green-500 text-white cursor-not-allowed bg-opacity-75" // Button turns green and becomes disabled on submit
                          : isNameFilled
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
          disabled={isFormSubmitted || !isNameFilled} // Disable after submission
        >
          {isFormSubmitted ? "Signed" : "Sign"}
        </button>
      </form>
    </div>
  );
};

export default LiabilityForm;