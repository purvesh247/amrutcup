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
      signerFirstName: "",
      signerLastName: "",
      signerRelationship: "",
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
    ageGroup,
  } = playerInfo;

  // Check if participant is a minor (15-17 age group)
  const isMinor = ageGroup === "14-17";

  // console.log("playerInfo", playerInfo);

  const signedBy = watch("signedBy");
  const signerFirstName = watch("signerFirstName");
  const signerLastName = watch("signerLastName");
  const signerRelationship = watch("signerRelationship");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // For adults: just signature needed
  // For minors: need signer info + signature
  const isNameFilled = signedBy && signedBy.trim() !== "";
  const isMinorFormComplete = isMinor
    ? (signerFirstName?.trim() && signerLastName?.trim() && signerRelationship?.trim() && isNameFilled)
    : isNameFilled;

  const regularLiabilityText = (
    <>
      <p>
        <strong>Read & Sign the BAPS Charities Liability Form Below*</strong>
      </p>
      <p>
        <strong>
          Warning: By Signing This Document You Will Waive Certain Legal Rights,
          Including The Right To Sue - Please Read Carefully
        </strong>
      </p>
      <p>
        To: BOCHASANWASI SHREE AKSHAR PURUSHOTTAM SWAMINARAYAN SANSTHA Charities
        INC. (hereinafter referred to as "BAPS Charities")
      </p>
      <p>
        In consideration to participate in the Amrut Cup Volleyball
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
        BAPS Charities, their affiliated organizations in Canada and in other
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
        To grant and convey unto BAPS Charities all right, title and interest in
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
        <b>
          I have read and understand this agreement and am
          aware that by signing this agreement I am waiving certain legal
          rights which I or my heirs, next of kin, executors, personal
          representatives and assigns may have against the Releasees.
        </b>
      </p>
      <p>
        <strong>
          I have read the above waiver of claims and release of liability
          document.
        </strong>
      </p>

    </>
  );


  const minorLiabilityText = (
    <>
      <p>
        <strong>Read & Sign the BAPS Charities Liability Form Below*</strong>
      </p>
      <p>
        <strong>
          Warning: By Signing This Document You Will Waive Certain Legal Rights,
          Including The Right To Sue - Please Read Carefully
        </strong>
      </p>
      <p>
        To: BOCHASANWASI SHREE AKSHAR PURUSHOTTAM SWAMINARAYAN SANSTHA Charities
        INC. (hereinafter referred to as "BAPS Charities")
      </p>
      <p>
        In consideration to participate in the Amrut Cup Volleyball
        Tournament schedule on {eventDate} (hereinafter referred to as "the Event") at {location}, I/We on behalf of Minor, my executors, personal representatives,
        heirs, next of kin, and assigns, freely and voluntarily execute this
        document under the following terms:
      </p>
      <p>
        <strong>ASSUMPTION OF RISKS</strong>
      </p>
      <p>
        I/We acknowledge, agree and represent that:
      </p>
      <p>
        I/We know and understand the risks associated with the Minor participating in the
        Event, including the following: Encounter any kind of physical injury at
        the Event and sickness from eating food that they may be allergic to. I/We
        freely accept and fully assume all such risks, dangers and hazards and
        the possibility of personal injury, harm, death, property damage or
        loss, resulting therefrom, and responsibility for losses, costs and
        damages, however caused, that I/We incur as a result of the participation
        in the Event.
      </p>
      <p>
        <strong>RELEASE OF LIABILITY, WAIVER OF CLAIMS AND INDEMNITY AGREEMENT</strong>
      </p>
      <p>
        I/We hereby agree:
      </p>
      <p>
        To waive any and all claims that I/We and the Minor have or may in the future have against
        BAPS Charities, their affiliated organizations in Canada and in other
        nations, its directors, officers, employees, volunteers, and members (all
        of whom are hereinafter collectively referred to as "the Releasees") and
        their respective successors and assigns;
      </p>
      <p>
        To release the Releasees and their respective successors and assigns from
        all liability or responsibility whatsoever for any loss, damage, injury,
        death or expense that I/We and the Minor may suffer, as a result of participation in the
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
        of or is in any way connected or associated with the Minor's participation in the
        Event.
      </p>
      <p>
        That I/We are not only giving up the right to sue the Releasees on our own
        behalf(ves) of the Minor, but also any rights of our respective heirs, next of kin,
        executors, personal representatives and assigns may have to sue resulting
        from the injury or death.
      </p>
      <p>
        To grant and convey unto BAPS Charities/Minor all right, title and interest in
        any and all photographic images and video or audio recordings made by the
        Releasees during the Event, including, but not limited to, any royalties,
        proceeds, or other benefits derived from such photographs or recordings.
        I/We also waive any and all rights, including moral rights, I/We have in the
        photographic images and video or audio recordings made by any of the
        Releasees, its assignees and licensees. I understand and agree that the
        Releasees may use, modify and/or publish the photographic images and
        video or audio recordings or portions thereof in any manner it considers
        appropriate;
      </p>
      <p>
        In entering into this Agreement, I/We and the Minor are not relying upon any oral or
        written representations or statements made by the Releasees other than
        what is set forth in this Agreement.
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
        <strong>
          I/We and the Minor have read the above waiver of claims and release of liability
          document.
        </strong>
      </p>

    </>
  );

  const generateLiabilityHTMLText = (input) => {
    return ReactDOMServer.renderToStaticMarkup(input);
  };

  // Normalize name for comparison: trim and collapse multiple spaces to one, lowercase
  const normalizeNameForComparison = (name) =>
    (name || "").trim().replace(/\s+/g, " ").toLowerCase();

  const onFormSubmit = (data) => {
    if (isMinorFormComplete) {
      const signedByValue = normalizeNameForComparison(data.signedBy);
      if (!signedByValue) {
        setError("signedBy", {
          type: "manual",
          message: "Please enter your full name to sign.",
        });
        return;
      }

      const participantFullNameForComparison = normalizeNameForComparison(
        `${firstName} ${lastName}`
      );

      // For adults, signature must match participant's full name
      if (!isMinor) {
        if (signedByValue !== participantFullNameForComparison) {
          setError("signedBy", {
            type: "manual",
            message:
              "Signature must be the same as your full name (first name and last name).",
          });
          return;
        }
      }

      // For minors, signature must match parent/guardian's full name
      if (isMinor) {
        const signerFullNameForComparison = normalizeNameForComparison(
          `${data.signerFirstName} ${data.signerLastName}`
        );
        if (signedByValue !== signerFullNameForComparison) {
          setError("signedBy", {
            type: "manual",
            message: "Signature must match the Parent/Guardian name entered above.",
          });
          return;
        }
      }

      setIsFormSubmitted(true); // Mark the form as submitted

      // Store trimmed, single-space-normalized full name as signature
      const signatureStored = (data.signedBy || "").trim().replace(/\s+/g, " ");

      const liabilityData = {
        // Participant info
        participantName: `${(firstName || "").trim()} ${(lastName || "").trim()}`.trim().replace(/\s+/g, " "),
        participantAgeGroup: ageGroup,
        isMinor: isMinor,

        // Signer info (for minors, this is parent/guardian)
        ...(isMinor && {
          signerFirstName: (data.signerFirstName || "").trim(),
          signerLastName: (data.signerLastName || "").trim(),
          signerRelationship: (data.signerRelationship || "").trim(),
        }),

        // Signature: full name, trimmed and normalized
        signature: signatureStored,

        // Contact info
        address: `${address}${city ? ", " + city : ""}${
          state ? ", " + state : ""
        }${postalCode ? " " + postalCode : ""}`,
        telephone: mobileNumber,

        // Timestamp for legal purposes
        signedAt: new Date().toISOString(),

        // Full liability text that was agreed to
        liabilityText: generateLiabilityHTMLText(isMinor ? minorLiabilityText : regularLiabilityText),
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
          {/* Render the liability text dynamically based on age group */}
          {isMinor ? minorLiabilityText : regularLiabilityText}
        </span>
      </div>

      <div id="signatureError" className="text-red-500 text-sm mt-1"></div>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* Parent/Guardian Info - Only shown for minors */}
        {isMinor && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-[rgb(1,55,100)] mb-3 flex items-center gap-2">
              <span>👨‍👩‍👧</span>
              Parent/Guardian Information
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Since the participant is under 18, a parent or guardian must sign this form.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent/Guardian First Name <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="signerFirstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="First Name"
                      {...field}
                      className="border rounded-lg p-2 w-full"
                      readOnly={isFormSubmitted}
                    />
                  )}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent/Guardian Last Name <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="signerLastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Last Name"
                      {...field}
                      className="border rounded-lg p-2 w-full"
                      readOnly={isFormSubmitted}
                    />
                  )}
                />
              </div>
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship to Participant <span className="text-red-500">*</span>
              </label>
              <Controller
                name="signerRelationship"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border rounded-lg p-2 w-full"
                    disabled={isFormSubmitted}
                  >
                    <option value="">Select Relationship</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Legal Guardian">Legal Guardian</option>
                    <option value="Other">Other</option>
                  </select>
                )}
              />
            </div>
          </div>
        )}

        {/* Signature Section */}
        <div className="mb-2">
          <label className="block font-semibold mb-2 mt-2">
            Signature <span className="text-red-500">*</span>
            <div className="font-normal text-sm mt-1">
              {isMinor ? (
                <p>
                  <span className="font-bold">Under 18 Years (Age 14-17):</span> Parent/Guardian:
                  Please type your full name below to electronically sign
                  and agree to the above liability form on behalf of the minor.
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
                placeholder={isMinor ? "Parent/Guardian Full Name" : "Sign Here By Typing Your Full Name"}
                {...field}
                className="border rounded-lg p-2 w-full"
                readOnly={isFormSubmitted}
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
                          ? "bg-green-500 text-white cursor-not-allowed bg-opacity-75"
                          : isMinorFormComplete
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
          disabled={isFormSubmitted || !isMinorFormComplete}
        >
          {isFormSubmitted ? "Signed" : "Sign"}
        </button>
      </form>
    </div>
  );
};

export default LiabilityForm;
