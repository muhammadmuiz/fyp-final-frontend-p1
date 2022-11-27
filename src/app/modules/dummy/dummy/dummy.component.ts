import { DatePipe, DOCUMENT, formatDate } from '@angular/common';
import { Component, ViewEncapsulation, Inject, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { ToolbarService, DocumentEditorContainerComponent, DocumentEditor, DocumentEditorComponent, EditorService, SelectionService, SfdtExportService, WordExportService } from '@syncfusion/ej2-angular-documenteditor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';


import { enableRipple } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';
import { WhiteSpaceValidator } from '../../accounts/validators/white-space.validator';

import { VoiceRecognitionService } from '../services/voice-recognition.service';

// mat component
import { VoicePopupComponent } from '../voice-popup/voice-popup.component';
import { LanguageTranslateComponent } from '../language-translate/language-translate.component';

enableRipple(true);

L10n.load({
  'ar-AE': {
      "documenteditor": {
          "Table": "الجدول",
          "Row": "الصف",
          "Cell": "الخليه",
          "Ok": "موافق",
          "Cancel": "إلغاء الأمر",
          "Size": "حجم",
          "Preferred Width": "العرض المفضل",
          "Points": "نقاط",
          "Percent": "المائه",
          "Measure in": "القياس في",
          "Alignment": "محاذاه",
          "Left": "اليسار",
          "Center": "مركز",
          "Right": "الحق",
          "Justify": "تبرير",
          "Indent from left": "مسافة بادئه من اليسار",
          "Borders and Shading": "الحدود والتظليل",
          "Options": "خيارات",
          "Specify height": "تحديد الارتفاع",
          "At least": "الاقل",
          "Exactly": "تماما",
          "Row height is": "ارتفاع الصف هو",
          "Allow row to break across pages": "السماح للصف بالخروج عبر الصفحات",
          "Repeat as header row at the top of each page": "تكرار كصف راس في اعلي كل صفحه",
          "Vertical alignment": "محاذاة عموديه",
          "Top": "أعلى",
          "Bottom": "اسفل",
          "Default cell margins": "هوامش الخلية الافتراضية",
          "Default cell spacing": "تباعد الخلايا الافتراضي",
          "Allow spacing between cells": "السماح بالتباعد بين الخلايا",
          "Cell margins": "هوامش الخلية",
          "Same as the whole table": "نفس الجدول بأكمله",
          "Borders": "الحدود",
          "None": "اي",
          "Style": "نمط",
          "Width": "عرض",
          "Height": "ارتفاع",
          "Letter": "رساله",
          "Tabloid": "التابلويد",
          "Legal": "القانونيه",
          "Statement": "بيان",
          "Executive": "التنفيذي",
          "A3": "A3",
          "A4": "A4",
          "A5": "A5",
          "B4": "B4",
          "B5": "B5",
          "Custom Size": "حجم مخصص",
          "Different odd and even": "مختلفه غريبه وحتى",
          "Different first page": "صفحه اولي مختلفه",
          "From edge": "من الحافة",
          "Header": "راس",
          "Footer": "تذييل الصفحه",
          "Margin": "الهوامش",
          "Paper": "الورق",
          "Layout": "تخطيط",
          "Orientation": "التوجه",
          "Landscape": "المناظر الطبيعيه",
          "Portrait": "صوره",
          "Show page numbers": "إظهار أرقام الصفحات",
          "Right align page numbers": "محاذاة أرقام الصفحات إلى اليمين",
          "Nothing": "شيء",
          "Tab leader": "قائد علامة التبويب",
          "Show levels": "إظهار المستويات",
          "Use hyperlinks instead of page numbers": "استخدام الارتباطات التشعبية بدلا من أرقام الصفحات",
          "Build table of contents from": "إنشاء جدول محتويات من",
          "Styles": "انماط",
          "Available styles": "الأنماط المتاحة",
          "TOC level": "مستوي جدول المحتويات",
          "Heading": "عنوان",
          "Heading 1": "العنوان 1",
          "Heading 2": "العنوان 2",
          "Heading 3": "العنوان 3",
          "Heading 4": "العنوان 4",
          "Heading 5": "العنوان 5",
          "Heading 6": "العنوان 6",
          "List Paragraph": "قائمه الفقرة",
          "Normal": "العاديه",
          "Outline levels": "مستويات المخطط التفصيلي",
          "Table entry fields": "حقول إدخال الجدول",
          "Modify": "تعديل",
          "Color": "لون",
          "Setting": "اعداد",
          "Box": "مربع",
          "All": "جميع",
          "Custom": "المخصصه",
          "Preview": "معاينه",
          "Shading": "التظليل",
          "Fill": "ملء",
          "Apply To": "تنطبق علي",
          "Table Properties": "خصائص الجدول",
          "Cell Options": "خيارات الخلية",
          "Table Options": "خيارات الجدول",
          "Insert Table": "ادراج جدول",
          "Number of columns": "عدد الاعمده",
          "Number of rows": "عدد الصفوف",
          "Text to display": "النص الذي سيتم عرضه",
          "Address": "عنوان",
          "Insert Hyperlink": "ادراج ارتباط تشعبي",
          "Edit Hyperlink": "تحرير ارتباط تشعبي",
          "Insert": "ادراج",
          "General": "العامه",
          "Indentation": "المسافه البادئه",
          "Before text": "قبل النص",
          "Special": "الخاصه",
          "First line": "السطر الأول",
          "Hanging": "معلقه",
          "After text": "بعد النص",
          "By": "من قبل",
          "Before": "قبل",
          "Line Spacing": "تباعد الأسطر",
          "After": "بعد",
          "At": "في",
          "Multiple": "متعدده",
          "Spacing": "تباعد",
          "Define new Multilevel list": "تعريف قائمه متعددة الاصعده جديده",
          "List level": "مستوي القائمة",
          "Choose level to modify": "اختيار مستوي لتعديل",
          "Level": "مستوي",
          "Number format": "تنسيق الأرقام",
          "Number style for this level": "نمط الرقم لهذا المستوي",
          "Enter formatting for number": "إدخال تنسيق لرقم",
          "Start at": "أبدا في",
          "Restart list after": "أعاده تشغيل القائمة بعد",
          "Position": "موقف",
          "Text indent at": "المسافة البادئة للنص في",
          "Aligned at": "محاذاة في",
          "Follow number with": "اتبع الرقم مع",
          "Tab character": "حرف علامة التبويب",
          "Space": "الفضاء",
          "Arabic": "العربية",
          "UpRoman": "UpRoman",
          "LowRoman": "لورومان",
          "UpLetter": "الوصلة الصاعدة",
          "LowLetter": "الحرف المنخفض",
          "Number": "عدد",
          "Leading zero": "الصفر الرئيسي",
          "Bullet": "رصاصه",
          "Ordinal": "الترتيبيه",
          "Ordinal Text": "النص الترتيبي",
          "For East": "للشرق",
          "No Restart": "لا أعاده تشغيل",
          "Font": "الخط",
          "Font style": "نمط الخط",
          "Underline style": "نمط التسطير",
          "Font color": "لون الخط",
          "Effects": "الاثار",
          "Strikethrough": "يتوسطه",
          "Superscript": "مرتفع",
          "Subscript": "منخفض",
          "Double strikethrough": "يتوسطه خط مزدوج",
          "Regular": "العاديه",
          "Bold": "جريئه",
          "Italic": "مائل",
          "Cut": "قطع",
          "Copy": "نسخ",
          "Paste": "لصق",
          "Hyperlink": "الارتباط التشعبي",
          "Open Hyperlink": "فتح ارتباط تشعبي",
          "Copy Hyperlink": "نسخ ارتباط تشعبي",
          "Remove Hyperlink": "أزاله ارتباط تشعبي",
          "Paragraph": "الفقره",
          "Linked Style": "مرتبط (فقره وحرف)",
          "Character": "حرف",
          "Merge Cells": "دمج الخلايا",
          "Insert Above": "ادراج أعلاه",
          "Insert Below": "تدرج أدناه",
          "Insert Left": "ادراج إلى اليسار",
          "Insert Right": "ادراج اليمين",
          "Delete": "حذف",
          "Delete Table": "حذف جدول",
          "Delete Row": "حذف الصف",
          "Delete Column": "حذف العمود",
          "File Name": "اسم الملف",
          "Format Type": "نوع التنسيق",
          "Save": "حفظ",
          "Navigation": "التنقل",
          "Results": "نتائج",
          "Replace": "استبدال",
          "Replace All": "استبدال الكل",
          "We replaced all": "لقد استبدلنا جميع",
          "Find": "العثور",
          "No matches": "لا توجد تطابقات",
          "All Done": "جميع الإنجازات",
          "Result": "نتيجه",
          "of": "من",
          "instances": "الحالات",
          "with": "مع",
          "Click to follow link": "انقر لمتابعه الرابط",
          "Continue Numbering": "متابعه الترقيم",
          "Bookmark name": "اسم الاشاره المرجعية",
          "Close": "اغلاق",
          "Restart At": "أعاده التشغيل في",
          "Properties": "خصائص",
          "Name": "اسم",
          "Style type": "نوع النمط",
          "Style based on": "نمط يستند إلى",
          "Style for following paragraph": "نمط للفقرة التالية",
          "Formatting": "التنسيق",
          "Numbering and Bullets": "الترقيم والتعداد النقطي",
          "Numbering": "ترقيم",
          "Update Field": "حقل التحديث",
          "Edit Field": "تحرير الحقل",
          "Bookmark": "الاشاره المرجعيه",
          "Page Setup": "اعداد الصفحة",
          "No bookmarks found": "لم يتم العثور علي إشارات مرجعيه",
          "Number format tooltip information": "تنسيق الرقم علي مستوي واحد: </فرع> [البادئة]% [LEVELNUMBER] [اللاحقة] </فرع> علي سبيل المثال ، سيعرض ' الفصل %1 ' ترقيما مثل </فرع> الفصل 1. البند </فرع> الفصل 2. البند </فرع>... </فرع> الفصل نون-البند </فرع> </فرع> تنسيق عدد متعدد الاصعده: </br> [بادئه]% [LEVELNUMBER] [لاحقه] + [بادئه]% [LEVELNUMBER] [لاحقه] </br> علي سبيل المثال ، '%1.2. ' سيتم عرض ترقيم مثل </فرع> 1.1. البند </فرع> 1.2. البند </فرع>... </فرع>1. N. البند",
          "Format": "تنسيق",
          "Create New Style": "إنشاء نمط جديد",
          "Modify Style": "تعديل النمط",
          "New": "الجديد",
          "Bullets": "الرصاص",
          "Use bookmarks": "استخدام الإشارات المرجعية",
          "Table of Contents": "جدول المحتويات",
          "AutoFit": "الاحتواء",
          "AutoFit to Contents": "احتواء تلقائي للمحتويات",
          "AutoFit to Window": "احتواء تلقائي إلى اطار",
          "Fixed Column Width": "عرض عمود ثابت",
          "Reset": "اعاده تعيين",
          "Match case": "حاله المباراة",
          "Whole words": "كلمات كامله",
          "Add": "اضافه",
          "Go To": "الانتقال إلى",
          "Search for": "ابحث عن",
          "Replace with": "استبدال ب",
          "TOC 1": "جدول المحتويات 1",
          "TOC 2": "جدول المحتويات 2",
          "TOC 3": "جدول المحتويات 3",
          "TOC 4": "جدول المحتويات 4",
          "TOC 5": "جدول المحتويات 5",
          "TOC 6": "جدول المحتويات 6",
          "TOC 7": "جدول المحتويات 7",
          "TOC 8": "جدول المحتويات 8",
          "TOC 9": "جدول المحتويات 9",
          "Right-to-left": "من اليمين إلى اليسار",
          "Left-to-right": "من اليسار إلى اليمين",
          "Direction": "الاتجاه",
          "Table direction": "اتجاه الجدول",
          "Indent from right": "مسافة بادئه من اليمين",
          "Contextual Spacing": "عدم أضافه مسافة بين فقرات نفس الأنماط",
          "Password Mismatch": "كلمه المرور لا  تتطابق",
          "Restrict Editing": "تقييد التحرير",
          "Formatting restrictions": "قيود التنسيق",
          "Allow formatting": "السماح بالتنسيق",
          "Editing restrictions": "قيود التحرير",
          "Read only": "للقراءة فقط",
          "Exceptions Optional": "الاستثناءات (اختياري)",
          "Select Part Of Document And User": "حدد أجزاء من المستند واختر المستخدمين المسموح لهم  بتحريرها بحريه.",
          "Everyone": "الجميع",
          "More users": "المزيد من المستخدمين",
          "Add Users": "أضافه مستخدمين",
          "Enforcing Protection": "نعم ، أبدا بفرض الحماية",
          "Start Enforcing Protection": "بدء فرض الحماية",
          "Enter User": "ادخل المستخدم",
          "Users": "المستخدمين",
          "Enter new password": "ادخل كلمه مرور جديده",
          "Reenter new password to confirm": "أعد إدخال كلمه مرور جديده للتاكيد",
          "Your permissions": "الأذونات الخاصة بك",
          "Protected Document": "هذا المستند محمي من التحرير غير المقصود .  يمكنك التحرير في هذه المنطقة.",
          "You may format text only with certain styles": "يمكنك تنسيق النص فقط مع أنماط معينه.",
          "Stop Protection": "إيقاف الحماية",
          "Password": "كلمه المرور",
          "Spelling Editor": "محرر الإملاء",
          "Spelling": "الاملائي",
          "Spell Check": "التدقيق الإملائي",
          "Underline errors": "أخطاء التسطير",
          "Ignore": "تجاهل",
          "Ignore all": "تجاهل الكل",
          "Add to Dictionary": "أضافه إلى القاموس",
          "Change": "تغيير",
          "Change All": "تغيير الكل",
          "Suggestions": "اقتراحات",
          "The password is incorrect": "كلمه المرور غير صحيحه",
          "Error in establishing connection with web server": "خطا في تاسيس اتصال مع ملقم ويب",
          "Highlight the regions I can edit": "تسليط الضوء علي المناطق يمكنني تحرير",
          "Show All Regions I Can Edit": "إظهار كل المناطق التي يمكنني تحريرها",
          "Find Next Region I Can Edit": "اعثر علي المنطقة التالية التي يمكنني تحريرها",
          "Keep source formatting": "الاحتفاظ بتنسيق المصدر",
          "Match destination formatting": "مطابقه تنسيق الوجهة",
          "Text only": "النص فقط",
          "Comments": "تعليقات",
          "Type your comment": "اكتب تعليقك",
          "Post": "وظيفه",
          "Reply": "الرد",
          "New Comment": "تعليق جديد",
          "Edit": "تحرير",
          "Resolve": "حل",
          "Reopen": "فتح",
          "No comments in this document": "لا توجد تعليقات في هذا المستند",
          "more": "اكثر",
          "Type your comment here": "اكتب تعليقك الاستماع",
          "Next Comment": "التعليق التالي",
          "Previous Comment": "التعليق السابق",
          "Un-posted comments": "Un-نشر التعليقات",
          "Discard Comment": "لم يتم نشر التعليقات المضافة. إذا قمت بالمتابعة ، سيتم تجاهل هذا التعليق.",
          "Drop Down Form Field": "حقل نموذج منسدل",
          "Drop-down items": "عناصر منسدلة",
          "Items in drop-down list": "العناصر في القائمة المنسدلة",
          "ADD": "أضف",
          "REMOVE": "إزالة",
          "Field settings": "الإعدادات الميدانية",
          "Tooltip": "تلميح",
          "Drop-down enabled": "تم تمكين القائمة المنسدلة",
          "Check Box Form Field": "حقل نموذج خانة الاختيار",
          "Check box size": "حجم خانة الاختيار",
          "Auto": "تلقاءي",
          "Default value": "القيمة الافتراضية",
          "Not checked": "غير مدقق",
          "Checked": "التحقق",
          "Check box enabled": "تم تمكين خانة الاختيار",
          "Text Form Field": "حقل نموذج نصي",
          "Type": "نوع",
          "Default text": "النص الافتراضي",
          "Maximum length": "الحد الأقصى لطول",
          "Text format": "تنسيق النص",
          "Fill-in enabled": "تم تمكين التعبئة",
          "Default number": "الرقم الافتراضي",
          "Default date": "التاريخ الافتراضي",
          "Date format": "صيغة التاريخ",
          "Merge Track": "لن يتم وضع علامة على هذا الإجراء كتغيير. هل تريد الاستمرار?",
          "UnTrack": "لا يمكن تعقبها",
          "Accept": "قبول",
          "Reject": "رفض",
          "Previous Changes": "التغييرات السابقة",
          "Next Changes": "التغييرات القادمة",
          "Inserted": "تم إدراجها",
          "Deleted": "تم الحذف",
          "Changes": "التغييرات",
          "Accept all": "قبول الكل",
          "Reject all": "رفض الكل",
          "No changes": "لا تغييرات",
          "Accept Changes": "قبول التغييرات",
          "Reject Changes": "رفض التغييرات",
          "User": "المستعمل",
          "View": "رأي"
      },
      "documenteditorcontainer": {
          "New": "الجديد",
          "Open": "فتح",
          "Undo": "التراجع عن",
          "Redo": "اعاده",
          "Image": "الصوره",
          "Form Fields": "حقول النموذج",
          "Table": "الجدول",
          "Link": "الارتباط",
          "Bookmark": "الاشاره المرجعيه",
          "Table of Contents": "جدول المحتويات",
          "HEADING - - - - 1": "العنوان----1",
          "HEADING - - - - 2": "العنوان----2",
          "HEADING - - - - 3": "العنوان----3",
          "Header": "راس",
          "Footer": "تذييل الصفحه",
          "Page Setup": "اعداد الصفحة",
          "Page Number": "رقم الصفحة",
          "Break": "كسر",
          "Find": "العثور",
          "Local Clipboard": "الحافظة المحلية",
          "Restrict Editing": "تقييد التحرير",
          "Upload from computer": "التحميل من الكمبيوتر",
          "By URL": "حسب عنوان URL",
          "Page Break": "فاصل الصفحات",
          "Section Break": "فاصل المقطع",
          "Header And Footer": "راس & تذييل",
          "Options": "خيارات",
          "Levels": "مستويات",
          "Different First Page": "الصفحة الاولي المختلفة",
          "Different header and footer for odd and even pages": "راس وتذييل مختلف للصفحات الفردية والزوجية.",
          "Different Odd And Even Pages": "مختلف الفردية & حتى صفحات",
          "Different header and footer for first page": "راس وتذييل الصفحة المختلفة للصفحة الاولي.",
          "Position": "موقف",
          "Header from Top": "راس من الأعلى",
          "Footer from Bottom": "تذييل من الأسفل",
          "Distance from top of the page to top of the header.": "المسافة من اعلي الصفحة إلى اعلي الراس.",
          "Distance from bottom of the page to bottom of the footer": "المسافة من أسفل الصفحة إلى أسفل التذييل.",
          "Aspect ratio": "نسبه العرض إلى الارتفاع",
          "W": "ث",
          "H": "ح",
          "Width": "عرض",
          "Height": "ارتفاع",
          "Text": "النص",
          "Paragraph": "الفقره",
          "Fill": "ملء",
          "Fill color": "لون التعبئة",
          "Border Style": "نمط الحدود",
          "Outside borders": "خارج الحدود",
          "All borders": "جميع الحدود",
          "Inside borders": "داخل الحدود",
          "Left border": "الحد الأيسر",
          "Inside vertical border": "داخل الحدود العمودية",
          "Right border": "الحدود اليمني",
          "Top border": "الحد العلوي",
          "Inside horizontal border": "داخل الحدود الافقيه",
          "Bottom border": "الحد السفلي",
          "Border color": "لون الحدود",
          "Border width": "عرض الحدود",
          "Cell": "الخليه",
          "Merge cells": "دمج الخلايا",
          "Insert Or Delete": "ادراج/حذف",
          "Insert columns to the left": "ادراج أعمده إلى اليسار",
          "Insert columns to the right": "ادراج أعمده إلى اليمين",
          "Insert rows above": "ادراج صفوف أعلاه",
          "Insert rows below": "ادراج صفوف أدناه",
          "Delete rows": "حذف الصفوف",
          "Delete columns": "حذف الاعمده",
          "Cell Margin": "هامش الخلية",
          "Top": "أعلى",
          "Bottom": "اسفل",
          "Left": "اليسار",
          "Right": "الحق",
          "Align Text": "محاذاة النص",
          "Align top": "محاذاة لاعلي",
          "Align bottom": "محاذاة إلى الأسفل",
          "Align center": "محاذاة المركز",
          "Number of heading or outline levels to be shown in table of contents": "عدد مستويات العنوان أو المخطط التفصيلي التي ستظهر في جدول المحتويات.",
          "Show page numbers": "إظهار أرقام الصفحات",
          "Show page numbers in table of contents": "إظهار أرقام الصفحات في جدول المحتويات.",
          "Right align page numbers": "محاذاة أرقام الصفحات إلى اليمين",
          "Right align page numbers in table of contents": "محاذاة أرقام الصفحات إلى اليمين في جدول المحتويات.",
          "Use hyperlinks": "استخدام الارتباطات التشعبية",
          "Use hyperlinks instead of page numbers": "استخدام الارتباطات التشعبية بدلا من أرقام الصفحات.",
          "Font": "الخط",
          "Font Size": "حجم الخط",
          "Font color": "لون الخط",
          "Text highlight color": "لون تمييز النص",
          "Clear all formatting": "مسح كافة التنسيقات",
          "Bold Tooltip": "غامق (Ctrl + B)",
          "Italic Tooltip": "مائل (Ctrl + I)",
          "Underline Tooltip": "تسطير (Ctrl + U)",
          "Strikethrough": "يتوسطه",
          "Superscript Tooltip": "مرتفع (Ctrl + Shift + +)",
          "Subscript Tooltip": "منخفض (Ctrl + =)",
          "Align left Tooltip": "محاذاة إلى اليسار (Ctrl + L)",
          "Center Tooltip": "المركز (Ctrl + E)",
          "Align right Tooltip": "محاذاة إلى اليمين (Ctrl + R)",
          "Justify Tooltip": "ضبط (Ctrl + J)",
          "Decrease indent": "إنقاص المسافة البادئة",
          "Increase indent": "زيادة المسافة البادئة",
          "Line spacing": "تباعد الأسطر",
          "Bullets": "الرصاص",
          "Numbering": "ترقيم",
          "Styles": "انماط",
          "Manage Styles": "أداره الأنماط",
          "Page": "صفحه",
          "of": "من",
          "Fit one page": "احتواء صفحه واحده",
          "Spell Check": "التدقيق الإملائي",
          "Underline errors": "أخطاء التسطير",
          "Fit page width": "احتواء عرض الصفحة",
          "Update": "تحديث",
          "Cancel": "إلغاء الأمر",
          "Insert": "ادراج",
          "No Border": "بلا حدود",
          "Create a new document": "إنشاء مستند جديد.",
          "Open a document": "افتح مستندا.",
          "Undo Tooltip": "التراجع عن العملية الاخيره (Ctrl + Z).",
          "Redo Tooltip": "أعاده العملية الاخيره (Ctrl + Y).",
          "Insert inline picture from a file": "ادراج صوره مضمنه من ملف.",
          "Insert a table into the document": "ادراج جدول في المستند",
          "Create Hyperlink": "إنشاء ارتباط في المستند للوصول السريع إلى صفحات الويب والملفات (Ctrl + K).",
          "Insert a bookmark in a specific place in this document": "ادراج اشاره مرجعيه في مكان محدد في هذا المستند.",
          "Provide an overview of your document by adding a table of contents": "توفير نظره عامه حول المستند عن طريق أضافه جدول محتويات.",
          "Add or edit the header": "أضافه الراس أو تحريره.",
          "Add or edit the footer": "أضافه تذييل الصفحة أو تحريره.",
          "Open the page setup dialog": "افتح مربع حوار اعداد الصفحة.",
          "Add page numbers": "أضافه أرقام الصفحات.",
          "Find Text": "البحث عن نص في المستند (Ctrl + F).",
          "Toggle between the internal clipboard and system clipboard": "التبديل بين الحافظة الداخلية وحافظه النظام. </br > تم رفض الوصول إلى حافظه النظام من خلال البرنامج النصي بسبب نهج أمان المستعرضات. بدلا من ذلك ، </br > 1. يمكنك تمكين الحافظة الداخلية للقطع والنسخ واللصق داخل المكون. </br > 2. يمكنك استخدام اختصارات لوحه المفاتيح (Ctrl + X و Ctrl + C و Ctrl + V) للقطع والنسخ واللصق مع حافظه النظام.",
          "Restrict editing.": "تقييد التحرير.",
          "Current Page Number": "رقم الصفحة الحالي في المستند. انقر أو اضغط للانتقال إلى صفحه معينه.",
          "Read only": "للقراءة فقط",
          "Protections": "الحمايه",
          "Error in establishing connection with web server": "خطا في تاسيس اتصال مع ملقم ويب",
          "Single": "واحد",
          "Double": "انقر نقرا مزدوجا",
          "New comment": "تعليق جديد",
          "Comments": "تعليقات",
          "Web layout": "تخطيط ويب",
          "Text Form": "شكل نصي",
          "Check Box": "خانة اختيار",
          "DropDown": "اسقاط",
          "Update Fields": "تحديث الحقول",
          "Update cross reference fields": "تحديث حقول الإسناد الترافقي",
          "Track Changes": "تتبع التغييرات التي تم إجراؤها في المستند",
          "TrackChanges": "تعقب التغيرات",
          "Insert Footnote": "أدخل حاشية سفلي",
          "Insert Endnote": "أدخل تعليق ختامي",
          "Footnote Tooltip": "أدخل حاشية سفلية (Alt + Ctrl + F).",
          "Endnote Tooltip": "أدخل تعليقًا ختاميًا (Alt + Ctr l + F).",
          "AllCaps":"كل قبعات",
          "Change case Tooltip":"تغيير الحالةلة"

      },
      'colorpicker': {
          'Apply': 'تطبيق',
          'Cancel': 'إلغاء الأمر',
          'ModeSwitcher': 'مفتاح كهربائي الوضع'
      }
  }
});

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
  providers: [ ToolbarService, 
    VoiceRecognitionService, 
    EditorService, 
    SelectionService, 
    SfdtExportService, 
    WordExportService],
    encapsulation: ViewEncapsulation.None,

})
export class DummyComponent implements OnInit {

  toggle = true;
  message = "Enable";

  dateForms;
  @ViewChild('documenteditor_default') public container: DocumentEditorContainerComponent;
  public documentEditor: DocumentEditorComponent;
  
  todayDate:Date = new Date();

  seconds1 = 0;
  minutes1 = 0;
  hours1 = 0;
  access = false;
  deadlineView = false;

  constructor(
    public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.dateForms = new FormGroup({
      date: new FormControl('', [
        Validators.required,
      ]),
  })
  }
  
  changeMode() {
    this.toggle = !this.toggle;
    if(this.toggle) {
      this.message = "Enable"
    }
    else {
      this.message = "Enabled"
    }
  }


  onCreate():void {
    console.log(this.container.documentEditor.serialize());
  }
  selectLan() {

  }


  onCreated() {
    //Specifies the language id to map server side dictionary.
    if (this.message = "Enabled") {
      this.container.documentEditor.spellChecker.languageID = 1033;
      this.container.documentEditor.spellChecker.removeUnderline = false;
      this.container.documentEditor.spellChecker.allowSpellCheckAndSuggestion = true;
    }
  }
  
  timer() {
    this.deadlineView = true;
    console.log('Current Date ' + this.todayDate)
    console.log('Form date ' + this.dateForms.value.date);
    let msBetweenDates = Math.abs(this.dateForms.value.date.getTime() - this.todayDate.getTime()) / 1000;
    console.log('Time ' + msBetweenDates); // 👉️ 86400000
    let abc = setInterval(() => {
          var a = msBetweenDates--;
          let seconds = Math.floor(a % 3600 % 60);
          let minutes = Math.floor(a % 3600 / 60);
          let hours = Math.floor(a / 3600 % 24);
          this.seconds1 = seconds;
          this.minutes1 = minutes;
          this.hours1 = hours;
          if(this.access) {
            clearInterval(abc);
            this.seconds1 = 0;
            this.minutes1 = 0;
            this.hours1 = 0;
            this.deadlineView = false;
          }
    }, 1100)
  }

  clearTimer() {
    this.seconds1 = 0;
    this.minutes1 = 0;
    this.hours1 = 0;
    this.access = true;
  }

  // start rec dialog
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(VoicePopupComponent, {
      width: '250px'
    });
  }

  openDialogTranslate(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LanguageTranslateComponent, {
      width: '850px'
    });
  }

  saveAsDocx(): void {
        //Export the document in docx format.
        this.container.documentEditor.save('sample', 'Docx');
  } 
}